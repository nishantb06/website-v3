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

const CONTENT_DIR = path.join(process.cwd(), "content", "knowledge");
const S3_TARGET = "s3://nishantbhansali-website-v3/public/knowledge/";
const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
const LAYOUT_TICKS = 300;

function readNotes() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  return files.map((file) => {
    const name = file.replace(/\.md$/, "");
    const id = slugify(name);
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      id,
      title: data.title ?? name,
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: content.trim(),
    };
  });
}

function buildLinks(nodes) {
  const nodeIds = new Set(nodes.map((node) => node.id));
  const seen = new Set();
  const links = [];

  for (const node of nodes) {
    for (const match of node.content.matchAll(WIKI_LINK_REGEX)) {
      const target = wikiLinkToSlug(match[1]);
      if (!nodeIds.has(target) || target === node.id) continue;
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
    .force("link", forceLink(layoutLinks).id((d) => d.id).distance(55))
    .force("center", forceCenter(0, 0))
    .stop();

  for (let i = 0; i < LAYOUT_TICKS; i += 1) sim.tick();
  return new Map(layoutNodes.map((node) => [node.id, node]));
}

function uploadToS3(indexPayload) {
  const tempFile = path.join(
    os.tmpdir(),
    `knowledge-graph-index-${Date.now()}.json`,
  );
  fs.writeFileSync(tempFile, JSON.stringify(indexPayload, null, 2), "utf-8");

  // Only upload markdown notes and graph-index to the allowed prefix.
  execSync(
    `aws s3 cp "${CONTENT_DIR}/" "${S3_TARGET}" --recursive --exclude "*" --include "*.md"`,
    { stdio: "inherit" },
  );
  execSync(`aws s3 cp "${tempFile}" "${S3_TARGET}graph-index.json"`, {
    stdio: "inherit",
  });

  fs.unlinkSync(tempFile);
}

function main() {
  const notes = readNotes();
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

  uploadToS3(indexPayload);
  console.log(
    `Uploaded ${notes.length} notes and graph-index.json to ${S3_TARGET}`,
  );
}

main();
