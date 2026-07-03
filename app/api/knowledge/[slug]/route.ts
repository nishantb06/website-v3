import { NextResponse } from "next/server";
import { getNoteContent } from "@/lib/knowledge";

const SLUG_REGEX = /^[a-z0-9-]+$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const normalized = slug.trim().toLowerCase();

  if (!SLUG_REGEX.test(normalized)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const note = await getNoteContent(normalized);
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(note, {
    status: 200,
    headers: {
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
