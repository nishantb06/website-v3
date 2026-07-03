// Turns an arbitrary note title / filename into a URL- and S3-safe slug.
// This MUST stay in sync with scripts/slugify.mjs so that the slug produced by
// the vault indexer (file names + node ids) matches the slug the app resolves
// wiki-links to at runtime.
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics (é -> e)
    .toLowerCase()
    .replace(/['’`]/g, "") // drop apostrophes so "jensen's" -> "jensens"
    .replace(/[^a-z0-9]+/g, "-") // any other run of non-alphanumerics -> "-"
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

// Normalizes an Obsidian wiki-link target to a slug. Handles folder paths
// (`[[folder/Note]]`) and heading / block anchors (`[[Note#Heading]]`,
// `[[Note#^block]]`) by keeping only the note name before slugifying.
export function wikiLinkToSlug(target: string): string {
  const withoutAnchor = target.split("#")[0];
  const basename = withoutAnchor.split(/[\\/]/).pop() ?? withoutAnchor;
  return slugify(basename);
}
