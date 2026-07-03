"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Badge } from "@/components/ui/badge";
import type { KnowledgeNote } from "@/lib/knowledge";
import { wikiLinkToSlug } from "@/lib/slugify";

interface NotePanelProps {
  note: KnowledgeNote | null;
  isLoading?: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

const MIN_PANEL_WIDTH = 320;
const DEFAULT_PANEL_WIDTH = 448;
const PANEL_WIDTH_STORAGE_KEY = "knowledge-note-panel-width";

function getMaxPanelWidth() {
  if (typeof window === "undefined") return 720;
  return Math.min(window.innerWidth - 40, 960);
}

function clampPanelWidth(width: number) {
  return Math.min(Math.max(width, MIN_PANEL_WIDTH), getMaxPanelWidth());
}

type ContentPart =
  | { type: "markdown"; value: string }
  | { type: "wiki"; slug: string; label: string };

// remark-math only treats multi-line `$$` fences as display math; a single-line
// `$$...$$` is parsed as inline. Rewrite every `$$...$$` block into the fenced
// form so it renders as centered display math.
function normalizeDisplayMath(content: string): string {
  return content.replace(
    /\$\$([\s\S]+?)\$\$/g,
    (_match, expr: string) => `\n\n$$\n${expr.trim()}\n$$\n\n`,
  );
}

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
      slug: wikiLinkToSlug(match[1]),
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
  const parts = useMemo(
    () => splitWikiLinks(normalizeDisplayMath(content)),
    [content],
  );

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
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                a: ({ href, children }) => {
                  const raw = (href ?? "").trim();
                  const isExternal = raw.includes("://") || raw.startsWith("mailto:");

                  if (raw && !isExternal) {
                    const stripped = raw
                      .replace(/^wiki:/, "")
                      .replace(/^\/knowledge-graph#knowledge-note-/, "")
                      .replace(/^#knowledge-note-/, "");
                    const targetSlug = wikiLinkToSlug(stripped);

                    if (targetSlug) {
                      return (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            onNavigate(targetSlug);
                          }}
                          className={wikiLinkClassName}
                        >
                          {children}
                        </button>
                      );
                    }
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

export function NotePanel({
  note,
  isLoading = false,
  onClose,
  onNavigate,
}: NotePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [note?.id]);

  useEffect(() => {
    const stored = window.localStorage.getItem(PANEL_WIDTH_STORAGE_KEY);
    if (stored) {
      const parsed = Number.parseFloat(stored);
      if (Number.isFinite(parsed)) {
        setWidth(clampPanelWidth(parsed));
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth((current) => clampPanelWidth(current));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startResize = useCallback((event: ReactPointerEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsResizing(true);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      setWidth(clampPanelWidth(window.innerWidth - moveEvent.clientX));
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      setWidth((current) => {
        window.localStorage.setItem(
          PANEL_WIDTH_STORAGE_KEY,
          String(current),
        );
        return current;
      });
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }, []);

  return (
    <AnimatePresence>
      {(note || isLoading) && (
        <motion.aside
          key="note-panel"
          className="pointer-events-auto fixed right-0 top-0 z-50 flex h-full max-w-[100vw] flex-col border-l bg-background shadow-2xl"
          style={{ width }}
          onMouseMove={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
        >
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize note panel"
            onPointerDown={startResize}
            className="group absolute left-0 top-0 z-10 flex h-full w-2 -translate-x-1/2 cursor-col-resize items-center justify-center"
          >
            <div
              className={`h-full w-px transition-colors ${
                isResizing
                  ? "bg-violet-500"
                  : "bg-transparent group-hover:bg-violet-400/60"
              }`}
            />
          </div>

          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">
              {isLoading ? "Loading note..." : note?.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close note"
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          {!isLoading && note && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pt-3">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            ) : note ? (
              <article className="prose prose-sm dark:prose-invert max-w-none">
                <NoteContent content={note.content} onNavigate={onNavigate} />
              </article>
            ) : (
              <p className="text-sm text-muted-foreground">Note not found.</p>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
