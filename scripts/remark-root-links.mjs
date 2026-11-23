// A link such as [About](/about/) in ANY Markdown file works on user or project Pages.
// No content is split, removed, or selected by this plugin.
export default function rootLinkPlugin({base='/' }={}) {
  const prefix = base.replace(/\/$/, '');
  return function(tree) {
    function visit(node) {
      if ((node.type === 'link' || node.type === 'image' || node.type === 'definition')
          && typeof node.url === 'string' && node.url.startsWith('/') && !node.url.startsWith('//')) {
        node.url = prefix + node.url;
      }
      if (Array.isArray(node.children)) node.children.forEach(visit);
    }
    visit(tree);
  };
}
