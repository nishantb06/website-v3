import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface KnowledgeNode {
  id: string;
  title: string;
  tags: string[];
  content: string;
}

export interface KnowledgeLink {
  source: string;
  target: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
}

const KNOWLEDGE_DIR = path.join(process.cwd(), "content", "knowledge");
const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

export function getKnowledgeGraph(): KnowledgeGraph {
  const files = fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((file) => file.endsWith(".md"));

  const nodes: KnowledgeNode[] = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(KNOWLEDGE_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      id: slug,
      title: data.title ?? slug,
      tags: data.tags ?? [],
      content: content.trim(),
    };
  });

  const nodeIds = new Set(nodes.map((node) => node.id));
  const seen = new Set<string>();
  const links: KnowledgeLink[] = [];

  for (const node of nodes) {
    for (const match of node.content.matchAll(WIKI_LINK_REGEX)) {
      const target = match[1].trim();
      // skip links to notes that don't exist and duplicate edges (either direction)
      if (!nodeIds.has(target) || target === node.id) continue;
      const key = [node.id, target].sort().join("::");
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ source: node.id, target });
    }
  }

  return { nodes, links };
}
