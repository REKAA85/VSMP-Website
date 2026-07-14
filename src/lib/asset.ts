// Resolves a path in `public/` against the app's base URL, so image paths
// still work when the site is deployed under a subpath (e.g. GitHub Pages).
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}
