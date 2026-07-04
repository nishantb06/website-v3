"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import type { KnowledgeGraph, KnowledgeNote } from "@/lib/knowledge";
import { NotePanel } from "./note-panel";
import { NoteSearch } from "./note-search";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      Loading graph...
    </div>
  ),
});

interface GraphNode {
  id: string;
  title: string;
  degree: number;
  x: number;
  y: number;
  fx: number;
  fy: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface ForceGraphRef {
  screen2GraphCoords: (x: number, y: number) => { x: number; y: number };
  zoomToFit: (ms?: number, px?: number) => void;
  centerAt: (x?: number, y?: number, ms?: number) => void;
}

function linkNodeId(nodeOrId: string | GraphNode) {
  return typeof nodeOrId === "object" ? nodeOrId.id : nodeOrId;
}

export function GraphView({ graph }: { graph: KnowledgeGraph }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<KnowledgeNote | null>(null);
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [zoomK, setZoomK] = useState(1);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<ForceGraphRef | undefined>(undefined);
  const noteCacheRef = useRef<Map<string, KnowledgeNote>>(new Map());

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dark = mounted && resolvedTheme === "dark";

  const graphData = useMemo(
    () => ({
      nodes: graph.nodes.map((n) => ({
        id: n.id,
        title: n.title,
        degree: n.degree,
        x: n.x,
        y: n.y,
        fx: n.x,
        fy: n.y,
      })),
      links: graph.links.map((l) => ({ ...l })),
    }),
    [graph]
  );

  useEffect(() => {
    if (!mounted || size.width === 0 || graphData.nodes.length === 0) return;
    const timeout = setTimeout(() => graphRef.current?.zoomToFit(600, 50), 200);
    return () => clearTimeout(timeout);
  }, [mounted, size.width, graphData.nodes.length]);

  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const node of graph.nodes) map.set(node.id, new Set());
    for (const link of graph.links) {
      map.get(link.source)?.add(link.target);
      map.get(link.target)?.add(link.source);
    }
    return map;
  }, [graph]);

  // Number of links per node, used to scale node size
  const degree = useMemo(() => {
    const map = new Map<string, number>();
    for (const node of graph.nodes) map.set(node.id, 0);
    for (const link of graph.links) {
      map.set(link.source, (map.get(link.source) ?? 0) + 1);
      map.set(link.target, (map.get(link.target) ?? 0) + 1);
    }
    return map;
  }, [graph]);

  const baseRadius = useCallback(
    (id: string) => 4 + (degree.get(id) ?? 0) * 0.9,
    [degree]
  );

  useEffect(() => {
    if (!selectedId) {
      setSelectedNote(null);
      setIsNoteLoading(false);
      return;
    }

    const cached = noteCacheRef.current.get(selectedId);
    if (cached) {
      setSelectedNote(cached);
      setIsNoteLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsNoteLoading(true);
    setSelectedNote(null);

    fetch(`/api/knowledge/${selectedId}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed note fetch: ${res.status}`);
        }
        return (await res.json()) as KnowledgeNote;
      })
      .then((note) => {
        noteCacheRef.current.set(selectedId, note);
        setSelectedNote(note);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Knowledge note load error:", error);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsNoteLoading(false);
      });

    return () => controller.abort();
  }, [selectedId]);

  const isDimmed = useCallback(
    (id: string) =>
      hoverId !== null && id !== hoverId && !neighbors.get(hoverId)?.has(id),
    [hoverId, neighbors]
  );

  const isLinkConnected = useCallback(
    (link: GraphLink) => {
      if (!hoverId) return false;
      const sourceId = linkNodeId(link.source);
      const targetId = linkNodeId(link.target);
      return sourceId === hoverId || targetId === hoverId;
    },
    [hoverId]
  );

  const linkColor = useCallback(
    (link: GraphLink) => {
      const connected = isLinkConnected(link);
      if (connected) {
        return dark ? "rgba(167, 139, 250, 0.95)" : "rgba(124, 58, 237, 0.9)";
      }
      if (hoverId) {
        return dark ? "rgba(148, 163, 184, 0.12)" : "rgba(100, 116, 139, 0.12)";
      }
      return dark ? "rgba(148, 163, 184, 0.35)" : "rgba(100, 116, 139, 0.35)";
    },
    [dark, hoverId, isLinkConnected]
  );

  const linkWidth = useCallback(
    (link: GraphLink) => (isLinkConnected(link) ? 2.5 : hoverId ? 0.6 : 1),
    [hoverId, isLinkConnected]
  );

  const drawNode = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const dimmed = isDimmed(node.id);
      const hovered = node.id === hoverId;
      const selected = node.id === selectedId;
      const base = baseRadius(node.id);
      const radius = hovered ? base + 4 : selected ? base + 2 : base;

      const nodeColor = dark
        ? dimmed
          ? "rgba(148, 163, 184, 0.25)"
          : hovered
            ? "#c4b5fd"
            : selected
              ? "#a78bfa"
              : "#94a3b8"
        : dimmed
          ? "rgba(100, 116, 139, 0.25)"
          : hovered
            ? "#6d28d9"
            : selected
              ? "#7c3aed"
              : "#64748b";

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      const shouldShowLabel = hovered || selected || zoomK > 1.15;
      if (shouldShowLabel) {
        const fontSize = Math.max(11 / globalScale, 3);
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = dark
          ? dimmed
            ? "rgba(226, 232, 240, 0.2)"
            : "#e2e8f0"
          : dimmed
            ? "rgba(30, 41, 59, 0.2)"
            : "#1e293b";
        ctx.fillText(node.title, node.x, node.y + radius + 2);
      }
    },
    [dark, hoverId, selectedId, isDimmed, baseRadius, zoomK]
  );

  const paintPointerArea = useCallback(
    (
      node: GraphNode,
      color: string,
      ctx: CanvasRenderingContext2D,
      globalScale: number
    ) => {
      const fontSize = Math.max(11 / globalScale, 3);
      ctx.font = `${fontSize}px sans-serif`;
      const labelWidth = ctx.measureText(node.title).width;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 18, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillRect(
        node.x - labelWidth / 2 - 4,
        node.y + 5,
        labelWidth + 8,
        fontSize + 8
      );
    },
    []
  );

  const nodeIdAtEvent = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const fg = graphRef.current;
      if (!fg) return null;

      const rect = event.currentTarget.getBoundingClientRect();
      const graphCoords = fg.screen2GraphCoords(
        event.clientX - rect.left,
        event.clientY - rect.top
      );
      const threshold = 28;

      let nearestId: string | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const node of graphData.nodes) {
        if (node.x == null || node.y == null) continue;
        const distance = Math.hypot(node.x - graphCoords.x, node.y - graphCoords.y);
        if (distance < threshold && distance < nearestDistance) {
          nearestDistance = distance;
          nearestId = node.id;
        }
      }

      return nearestId;
    },
    [graphData.nodes]
  );

  const updateHoverFromMouse = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const nearestId = nodeIdAtEvent(event);
      setHoverId((currentHoverId) =>
        currentHoverId === nearestId ? currentHoverId : nearestId
      );
    },
    [nodeIdAtEvent]
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const clickedId = nodeIdAtEvent(event);
      setSelectedId(clickedId);
    },
    [nodeIdAtEvent]
  );

  const handleSearchSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
      const targetNode = graphData.nodes.find((node) => node.id === id);
      if (targetNode) {
        graphRef.current?.centerAt(targetNode.x, targetNode.y, 400);
      }
    },
    [graphData.nodes]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      onMouseMove={updateHoverFromMouse}
      onMouseLeave={() => setHoverId(null)}
      onClick={handleClick}
    >
      {mounted && size.width > 0 && (
        <ForceGraph2D
          ref={graphRef as never}
          width={size.width}
          height={size.height}
          graphData={graphData}
          nodeCanvasObject={drawNode as never}
          nodeCanvasObjectMode={() => "replace"}
          nodePointerAreaPaint={paintPointerArea as never}
          linkColor={linkColor as never}
          linkWidth={linkWidth as never}
          backgroundColor="rgba(0,0,0,0)"
          onZoom={(transform: { k: number }) => setZoomK(transform.k)}
          enableNodeDrag={false}
          autoPauseRedraw={false}
          cooldownTicks={0}
          d3VelocityDecay={0.3}
        />
      )}

      <NoteSearch nodes={graph.nodes} onSelect={handleSearchSelect} />

      <NotePanel
        note={selectedNote}
        isLoading={isNoteLoading}
        onClose={() => setSelectedId(null)}
        onNavigate={(id) => {
          const normalized = id.trim().toLowerCase();
          if (graphData.nodes.some((n) => n.id === normalized)) {
            setSelectedId(normalized);
          }
        }}
      />
    </div>
  );
}
