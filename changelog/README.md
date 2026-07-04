# Changelog

## 2026-07-04 — Graph note search bar

Added a compact search bar in the top-left of `/knowledge-graph` so notes can
be found and opened quickly without hunting through the graph manually.

### What changed

- `components/knowledge-graph/note-search.tsx` (new)
  - Added an inline shadcn `Command` search UI overlay for the graph canvas.
  - Searches by note title and tags.
  - Keeps the UI compact: results list appears only after typing.
- `components/knowledge-graph/graph-view.tsx`
  - Mounted `NoteSearch` over the graph canvas.
  - Selecting a search result reuses the existing note-open flow
    (`setSelectedId`) and pans the graph viewport to the selected node with
    `centerAt(...)`.

## 2026-07-03 — S3-backed knowledge graph, wiki-link slug fix & deploy workflow

The Obsidian-style knowledge graph moved from bundled in-repo markdown to a
public S3-backed content source, a standalone external-vault indexer was added,
and a slug bug that broke wiki-link navigation for titles with spaces or
apostrophes (e.g. `[[Jensen's Inequality]]`) was fixed.

### The wiki-link bug

Clicking an in-note wiki-link like `[[Jensen's Inequality]]` did nothing. Two
independent problems caused this:

1. The note panel produced the slug with `title.trim().toLowerCase()`, yielding
   `jensen's inequality` — a value with a space and an apostrophe.
2. That never matched the graph node id (`jensens-inequality`), and even if it
   had, the note API route rejects anything outside `^[a-z0-9-]+$` with a `400`,
   so the note body could never be fetched.

The renderer, the graph node ids, the link builder, and the API route each had
slightly different ideas of what a slug was. They now share one definition.

### New: shared slugify

- `lib/slugify.ts` (app runtime) and `scripts/slugify.mjs` (Node scripts) expose
  identical `slugify()` and `wikiLinkToSlug()` helpers. `slugify()` strips
  diacritics, drops apostrophes (`jensen's` -> `jensens`), and collapses every
  other run of non-alphanumerics into single hyphens. `wikiLinkToSlug()` also
  strips folder paths (`[[folder/Note]]`) and heading / block anchors
  (`[[Note#Heading]]`, `[[Note#^block]]`) before slugifying.
- **These two files must stay in sync** — they are the single source of truth
  shared between build-time indexing and runtime resolution.

### Code changes

- `components/knowledge-graph/note-panel.tsx`
  - `[[wiki-links]]` now resolve through `wikiLinkToSlug()`.
  - Inline markdown links (`[text](target)`) also resolve through
    `wikiLinkToSlug()`; external links (`://`, `mailto:`) are detected first so
    they are left untouched.

- `scripts/index-knowledge.mjs`
  - Node ids and wiki-link targets now go through the shared slugify, so the
    in-repo indexer agrees with the app on every slug.

- `scripts/push-vault.mjs` (new) — external Obsidian vault indexer
  - Recursively walks an arbitrary vault path (skipping `.obsidian`, `.trash`,
    `templates`, etc.), slugifies each note, and detects slug collisions.
  - Builds the link graph from `[[wiki-links]]`, computes degrees, and
    precomputes a `d3-force` layout (same params as the in-repo indexer).
  - Stages each note as `<slug>.md` in a temp dir so S3 object keys line up
    with the slugs the app requests, then `aws s3 sync ... --delete` mirrors the
    staging dir into the prefix (removed notes are deleted from S3 too).
  - Refuses to upload an empty index, guarding against wiping the graph.

- `package.json`
  - Added `npm run push:vault` (alongside the existing `index:knowledge`).

### Environment variables

| Variable | Where | Required | Notes |
| --- | --- | --- | --- |
| `NOTION_API_KEY` | Amplify + `.env.local` | Yes (blog) | Notion access for `/blog`. |
| `NOTION_DATABASE_ID` | Amplify + `.env.local` | Yes (blog) | Blog post database. |
| `NEXT_PUBLIC_KNOWLEDGE_S3_BASE` | Amplify (optional) | No | Overrides the public S3 base URL; defaults to the hardcoded bucket URL in `lib/knowledge.ts`. |
| `OBSIDIAN_VAULT_DIR` | Local shell (indexing only) | No | Alternative to passing the vault path as an argument to `push:vault`. |
| `KNOWLEDGE_S3_TARGET` | Local shell (indexing only) | No | Overrides the upload target (`s3://.../public/knowledge/`). |

The knowledge graph needs **no AWS credentials at runtime** — the bucket prefix
is public and read over plain HTTPS. AWS credentials are only needed locally
(or in a content pipeline) when running an indexer that uploads.

### Production / deploy workflow

Content publishing and app deployment are two separate pipelines:

1. **Publish content (only when notes change), run from your machine:**
   - `npm run push:vault "/path/to/Obsidian/Vault"` (external vault), or
   - `npm run index:knowledge` (in-repo `content/knowledge`).
   - Requires the AWS CLI authenticated with write access to the target prefix.
2. **Deploy the site (Amplify):** `npm ci && npm run build`. Do **not** run any
   indexer in the Amplify build — the external vault is not present in CI and an
   in-repo run there could publish a stale/empty index.

### Caveats / gotchas

- **`slugify.ts` ↔ `slugify.mjs` drift:** if you change one, change the other,
  or wiki-link navigation silently breaks again.
- **ISR lag:** `app/knowledge-graph/page.tsx` and `/api/knowledge/[slug]` cache
  for 1 hour (`revalidate = 3600` / `s-maxage=3600`). After pushing content,
  production can take up to an hour to reflect it unless you redeploy.
- **Graph fails soft:** `getKnowledgeGraph()` returns an empty graph if S3 is
  unreachable, so a build never fails on a bad/missing index — smoke-test
  `/knowledge-graph` after each deploy.
- **Everything under `public/knowledge/` is world-readable** — never push
  private vault notes to that prefix.
- **Slug collisions:** two notes that slugify to the same value can't coexist;
  `push:vault` warns and keeps the first — rename one to resolve.

## 2026-07-02 — Migrate blog rendering to react-notion-x

Blog post content was previously fetched through the unofficial Splitbee proxy
(`https://notion-api.splitbee.io/v1/page/<id>`) and rendered with the
unmaintained `react-notion` package. Splitbee silently returned `{}` for some
pages, which made post bodies render blank with no error. This migration
replaces both the fetcher and the renderer.

### Dependencies

- Removed: `react-notion`
- Added: `react-notion-x` (renderer), `notion-client` (unofficial Notion API
  client), `prismjs` (now a direct dependency for code highlighting), `katex`
  (equation rendering), `@types/prismjs` (dev)

### Code changes

- `lib/notion.ts`
  - `getNotionPage()` now calls `NotionAPI.getPage()` from `notion-client`
    (wrapped in React `cache`) and returns an `ExtendedRecordMap`. Failures
    throw instead of silently returning an empty object.

- `components/notion-page-renderer.tsx` (new)
  - Client component wrapping `react-notion-x`'s `NotionRenderer`.
  - Lazily loads heavyweight optional components via `next/dynamic`:
    - `Code` — syntax highlighting with extra Prism grammars (python, bash,
      docker, yaml, json, sql, go, rust)
    - `Equation` — katex math rendering
    - `Collection` — embedded database / collection views
  - Integrates `next/image` and `next/link` for optimized images and
    client-side navigation.
  - Dark mode follows the site theme via `next-themes`, gated behind a
    mounted check to avoid hydration mismatches.

- `app/blog/[slug]/page.tsx`
  - Swapped style imports to `react-notion-x/src/styles.css` and added
    `katex/dist/katex.min.css`.
  - Renders `NotionPageRenderer` with the fetched `recordMap`.

- `types/prismjs-components.d.ts` (new)
  - Module declaration for `prismjs/components/*` subpath imports, which are
    not covered by `@types/prismjs`.

### Behavior notes

- Pages must still be publicly accessible on Notion (the public database
  covers this); no auth token is used.
- Previously broken posts that returned `{}` from Splitbee now render
  correctly.
- Block support is much broader than before: nested blocks, image captions,
  lists, callouts, toggles, columns, and embedded collection views all render.
