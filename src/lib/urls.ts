/** Site-root-relative URLs that also work in GitHub Pages project repositories. */
export function localUrl(path: string) {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`.replace(/\/{2,}/g, '/');
}
