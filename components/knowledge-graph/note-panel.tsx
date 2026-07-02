"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import type { KnowledgeNode } from "@/lib/knowledge";

interface NotePanelProps {
  note: KnowledgeNode | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

type ContentPart =
  | { type: "markdown"; value: string }
  | { type: "wiki"; slug: string; label: string };

function splitWikiLinks(content: string): ContentPart[] {
  const parts: ContentPart[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(WIKI_LINK_REGEX)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ type: "markdown", value: content.slice(lastIndex, index) });
    }
    parts.push({
      type: "wiki",
      slug: match[1].trim().toLowerCase(),
      label: (match[2] ?? match[1]).trim(),
    });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "markdown", value: content.slice(lastIndex) });
  }

  return parts;
}

const wikiLinkClassName =
  "inline cursor-pointer border-0 bg-transparent p-0 font-medium text-violet-600 underline decoration-dotted underline-offset-2 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300";

function NoteContent({
  content,
  onNavigate,
}: {
  content: string;
  onNavigate: (id: string) => void;
}) {
  const parts = useMemo(() => splitWikiLinks(content), [content]);

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "wiki") {
          return (
            <button
              key={`wiki-${i}-${part.slug}`}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onNavigate(part.slug);
              }}
              className={wikiLinkClassName}
            >
              {part.label}
            </button>
          );
        }

        return (
          <Fragment key={`md-${i}`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => {
                  const normalizedHref = href
                    ?.replace(/^wiki:/, "")
                    .replace(/^#knowledge-note-/, "")
                    .replace(/^\/knowledge-graph#knowledge-note-/, "")
                    .trim()
                    .toLowerCase();

                  if (normalizedHref && !normalizedHref.includes("://")) {
                    return (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          onNavigate(normalizedHref);
                        }}
                        className={wikiLinkClassName}
                      >
                        {children}
                      </button>
                    );
                  }

                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {part.value}
            </ReactMarkdown>
          </Fragment>
        );
      })}
    </>
  );
}

export function NotePanel({ note, onClose, onNavigate }: NotePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [note?.id]);

  return (
    <AnimatePresence>
      {note && (
        <motion.aside
          key="note-panel"
          className="pointer-events-auto fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l bg-background shadow-2xl"
          onMouseMove={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close note"
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pt-3">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
            <article className="prose prose-sm dark:prose-invert max-w-none">
              <NoteContent content={note.content} onNavigate={onNavigate} />
            </article>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
