// Standalone indexer for an EXTERNAL Obsidian vault.
//
// Unlike scripts/index-knowledge.mjs (which reads the in-repo content/knowledge
// folder), this walks an arbitrary Obsidian vault anywhere on disk, slugifies
// every note into an S3/URL-safe name, builds the link graph from
// [[wiki-links]], precomputes a force-directed layout, and uploads:
//   - <slug>.md          (one per note, renamed to its slug)
//   - graph-index.json   (nodes + links + precomputed x/y)
// to the public S3 prefix the website reads from.
//
// Usage:
//   node scripts/push-vault.mjs "/path/to/Obsidian/Vault"
//   OBSIDIAN_VAULT_DIR="/path/to/vault" node scripts/push-vault.mjs
//
// Requires the AWS CLI to be installed and authenticated with write access to
// the target bucket/prefix. Override the target with KNOWLEDGE_S3_TARGET.
//
// This script is intentionally NOT wired into the Amplify build. Run it locally
// (or in a dedicated content pipeline) whenever the vault changes, then let the
// site pick up the new index on its next revalidation / deploy.

import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import matter from "gray-matter";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
} from "d3-force";
import { slugify, wikiLinkToSlug } from "./slugify.mjs";

const VAULT_DIR = process.argv[2] ?? process.env.OBSIDIAN_VAULT_DIR;
const S3_TARGET =
  process.env.KNOWLEDGE_S3_TARGET ??
  "s3://nishantbhansali-website-v3/public/knowledge/";
const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
const LAYOUT_TICKS = 300;

// Folders that should never be treated as note content.
const IGNORED_DIRS = new Set([
  ".obsidian",
  ".trash",
  ".git",
  "node_modules",
  "templates",
  "Templates",
]);

if (!VAULT_DIR) {
  console.error(
    'Usage: node scripts/push-vault.mjs "/path/to/Obsidian/Vault"\n' +
      "   or: OBSIDIAN_VAULT_DIR=/path/to/vault node scripts/push-vault.mjs",
  );
  process.exit(1);
}

if (!fs.existsSync(VAULT_DIR) || !fs.statSync(VAULT_DIR).isDirectory()) {
  console.error(`Vault directory not found: ${VAULT_DIR}`);
  process.exit(1);
}

function walkMarkdown(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && !entry.isFile()) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      out.push(...walkMarkdown(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

function readNotes() {
  const files = walkMarkdown(VAULT_DIR).sort();
  const bySlug = new Map();

  for (const file of files) {
    const name = path.basename(file, ".md");
    const id = slugify(name);
    if (!id) {
      console.warn(`Skipping note with empty slug: ${file}`);
      continue;
    }

    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);

    if (bySlug.has(id)) {
      console.warn(
        `Slug collision "${id}": "${bySlug.get(id).sourcePath}" vs "${file}". ` +
          "Keeping the first; rename one of the notes to avoid this.",
      );
      continue;
    }

    bySlug.set(id, {
      id,
      title: data.title ?? name,
      tags: Array.isArray(data.tags)
        ? data.tags.filter((tag) => typeof tag === "string")
        : [],
      content: content.trim(),
      sourcePath: file,
    });
  }

  return [...bySlug.values()];
}

function buildLinks(nodes) {
  const nodeIds = new Set(nodes.map((node) => node.id));
  const seen = new Set();
  const links = [];

  for (const node of nodes) {
    for (const match of node.content.matchAll(WIKI_LINK_REGEX)) {
      const target = wikiLinkToSlug(match[1]);
      if (!target || !nodeIds.has(target) || target === node.id) continue;
      const key = [node.id, target].sort().join("::");
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ source: node.id, target });
    }
  }

  return links;
}

function computeDegrees(nodes, links) {
  const degreeMap = new Map(nodes.map((node) => [node.id, 0]));
  for (const link of links) {
    degreeMap.set(link.source, (degreeMap.get(link.source) ?? 0) + 1);
    degreeMap.set(link.target, (degreeMap.get(link.target) ?? 0) + 1);
  }
  return degreeMap;
}

function computeLayout(nodes, links) {
  const layoutNodes = nodes.map((node, i) => {
    const angle = (i / Math.max(nodes.length, 1)) * 2 * Math.PI;
    return {
      id: node.id,
      x: Math.cos(angle) * 400,
      y: Math.sin(angle) * 400,
    };
  });

  const layoutLinks = links.map((link) => ({ ...link }));
  const sim = forceSimulation(layoutNodes)
    .force("charge", forceManyBody().strength(-120))
    .force(
      "link",
      forceLink(layoutLinks)
        .id((d) => d.id)
        .distance(55),
    )
    .force("center", forceCenter(0, 0))
    .stop();

  for (let i = 0; i < LAYOUT_TICKS; i += 1) sim.tick();
  return new Map(layoutNodes.map((node) => [node.id, node]));
}

// Stage each note under its slug filename so S3 object keys line up with the
// slugs the app requests via /api/knowledge/<slug>.
function stageNotes(notes) {
  const stageDir = fs.mkdtempSync(path.join(os.tmpdir(), "vault-stage-"));
  for (const note of notes) {
    fs.copyFileSync(note.sourcePath, path.join(stageDir, `${note.id}.md`));
  }
  return stageDir;
}

function uploadToS3(stageDir, indexPayload) {
  const indexFile = path.join(stageDir, "graph-index.json");
  fs.writeFileSync(indexFile, JSON.stringify(indexPayload, null, 2), "utf-8");

  // `sync` mirrors the staging dir into the prefix, deleting slugs that no
  // longer exist in the vault so removed notes don't linger on S3.
  execSync(
    `aws s3 sync "${stageDir}/" "${S3_TARGET}" --exclude "*" --include "*.md" --include "graph-index.json" --delete`,
    { stdio: "inherit" },
  );
}

function main() {
  const notes = readNotes();
  if (notes.length === 0) {
    console.error(
      `No markdown notes found in ${VAULT_DIR}. Refusing to upload an empty index.`,
    );
    process.exit(1);
  }

  const links = buildLinks(notes);
  const degreeMap = computeDegrees(notes, links);
  const layoutMap = computeLayout(notes, links);

  const indexPayload = {
    generatedAt: new Date().toISOString(),
    noteCount: notes.length,
    linkCount: links.length,
    nodes: notes.map((note) => {
      const layout = layoutMap.get(note.id);
      return {
        id: note.id,
        title: note.title,
        tags: note.tags,
        degree: degreeMap.get(note.id) ?? 0,
        x: Number((layout?.x ?? 0).toFixed(2)),
        y: Number((layout?.y ?? 0).toFixed(2)),
      };
    }),
    links,
  };

  const stageDir = stageNotes(notes);
  try {
    uploadToS3(stageDir, indexPayload);
  } finally {
    fs.rmSync(stageDir, { recursive: true, force: true });
  }

  console.log(
    `Uploaded ${notes.length} notes (${links.length} links) to ${S3_TARGET}`,
  );
}

main();
