import BlurIn from "@/components/magicui/blurin";
import { GraphView } from "@/components/knowledge-graph/graph-view";
import { getKnowledgeGraph } from "@/lib/knowledge";

export default function KnowledgeGraphPage() {
  const graph = getKnowledgeGraph();

  return (
    <div className="flex h-screen flex-col py-4">
      <div className="container mx-auto max-w-2xl px-4 py-4">
        <div className="text-5xl font-bold">
          <BlurIn duration={0.5} className="h-full">
            Knowledge Graph
          </BlurIn>
        </div>
        <div className="text-xl text-neutral-500 dark:text-neutral-400">
          <BlurIn duration={0.5} className="h-full">
            Linked notes, Obsidian-style. Click a node to read.
          </BlurIn>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <GraphView graph={graph} />
      </div>
    </div>
  );
}
