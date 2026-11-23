import { defineConfig } from 'astro/config';
import rootLinkPlugin from './scripts/remark-root-links.mjs';

// For guillermodeandajauregui.github.io the site is at /.
// For a normal project repository Astro automatically uses /repository/ in CI.
const repository = process.env.GITHUB_REPOSITORY?.split('/').pop() || '';
const owner = process.env.GITHUB_REPOSITORY_OWNER || 'guillermodeandajauregui';
const githubUserSite = repository.endsWith('.github.io');
const base = process.env.SITE_BASE || (repository && !githubUserSite ? `/${repository}/` : '/');
const site = process.env.SITE_URL || `https://${owner}.github.io`;

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [[rootLinkPlugin, { base }]],
  },
});
