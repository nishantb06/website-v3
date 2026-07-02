# Changelog

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
