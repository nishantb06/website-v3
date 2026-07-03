import matter from "gray-matter";

export interface KnowledgeNode {
  id: string;
  title: string;
  tags: string[];
  degree: number;
  x: number;
  y: number;
}

export interface KnowledgeLink {
  source: string;
  target: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
}

export interface KnowledgeNote {
  id: string;
  title: string;
  tags: string[];
  content: string;
}

const DEFAULT_S3_KNOWLEDGE_BASE =
  "https://nishantbhansali-website-v3.s3.ap-south-1.amazonaws.com/public/knowledge";
const S3_KNOWLEDGE_BASE = (
  process.env.NEXT_PUBLIC_KNOWLEDGE_S3_BASE ?? DEFAULT_S3_KNOWLEDGE_BASE
).replace(/\/+$/, "");

export async function getKnowledgeGraph(): Promise<KnowledgeGraph> {
  try {
    const response = await fetch(`${S3_KNOWLEDGE_BASE}/graph-index.json`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`S3 index fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as Partial<KnowledgeGraph> & {
      nodes?: Array<Partial<KnowledgeNode>>;
      links?: Array<Partial<KnowledgeLink>>;
    };

    const nodes: KnowledgeNode[] = (data.nodes ?? [])
      .filter((node) => typeof node.id === "string")
      .map((node) => ({
        id: node.id!,
        title: typeof node.title === "string" ? node.title : node.id!,
        tags: Array.isArray(node.tags) ? node.tags.filter((v) => typeof v === "string") : [],
        degree: typeof node.degree === "number" ? node.degree : 0,
        x: typeof node.x === "number" ? node.x : 0,
        y: typeof node.y === "number" ? node.y : 0,
      }));

    const links: KnowledgeLink[] = (data.links ?? [])
      .filter(
        (link): link is { source: string; target: string } =>
          typeof link.source === "string" && typeof link.target === "string",
      )
      .map((link) => ({ source: link.source, target: link.target }));

    return { nodes, links };
  } catch (error) {
    console.warn("Failed to load knowledge graph index from S3:", error);
    return { nodes: [], links: [] };
  }
}

export async function getNoteContent(slug: string): Promise<KnowledgeNote | null> {
  try {
    const response = await fetch(`${S3_KNOWLEDGE_BASE}/${slug}.md`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`S3 note fetch failed: ${response.status}`);
    }

    const raw = await response.text();
    const { data, content } = matter(raw);
    return {
      id: slug,
      title: typeof data.title === "string" ? data.title : slug,
      tags: Array.isArray(data.tags)
        ? data.tags.filter((tag): tag is string => typeof tag === "string")
        : [],
      content: content.trim(),
    };
  } catch (error) {
    console.warn(`Failed to load note '${slug}' from S3:`, error);
    return null;
  }
}
