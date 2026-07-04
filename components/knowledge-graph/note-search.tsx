"use client";

import { useMemo, useState } from "react";
import type { KnowledgeNode } from "@/lib/knowledge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface NoteSearchProps {
  nodes: Pick<KnowledgeNode, "id" | "title" | "tags">[];
  onSelect: (id: string) => void;
}

export function NoteSearch({ nodes, onSelect }: NoteSearchProps) {
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim();

  const sortedNodes = useMemo(
    () => [...nodes].sort((a, b) => a.title.localeCompare(b.title)),
    [nodes]
  );

  const shouldShowList = trimmedQuery.length > 0;

  return (
    <div
      className="pointer-events-auto absolute left-4 top-4 z-50 w-80 max-w-[calc(100%-2rem)]"
      onPointerDown={(event) => event.stopPropagation()}
      onMouseMove={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <Command className="rounded-lg border bg-background/95 shadow-md backdrop-blur-sm">
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search notes..."
        />
        {shouldShowList && (
          <CommandList className="max-h-72">
            <CommandEmpty>No notes found.</CommandEmpty>
            <CommandGroup heading="Notes">
              {sortedNodes.map((node) => (
                <CommandItem
                  key={node.id}
                  value={`${node.title} ${node.tags.join(" ")}`.trim()}
                  onSelect={() => {
                    onSelect(node.id);
                    setQuery("");
                  }}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="truncate">{node.title}</span>
                    {node.tags[0] && (
                      <span className="truncate text-xs text-muted-foreground">
                        #{node.tags[0]}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
