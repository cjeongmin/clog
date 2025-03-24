import createMDX from '@next/mdx';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkMath],
    rehypePlugins: [
      [rehypeRaw, { passThrough: ['mdxjsEsm'] }],
      rehypeSanitize,
      rehypeHighlight,
      rehypeKatex,
      [rehypeHighlightCodeLines, { showLineNumbers: true }],
    ],
  },
});

export default withMDX(nextConfig);
