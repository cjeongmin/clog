import createMDX from '@next/mdx';
import { NextConfig } from 'next';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';
import rehypeKatex from 'rehype-katex';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const env = process.env.NEXT_CONFIG_ENV || 'development';
const outdir = process.env.NEXT_PUBLIC_BASE_PATH || '/';

const defaultConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig =
  {
    development: {} as NextConfig,
    production: {
      output: 'export',
      basePath: outdir,
      images: {
        loader: 'custom',
        loaderFile: './lib/imageLoader.ts',
      },
    } as NextConfig,
  }[env] || {};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeKatex, [rehypeHighlightCodeLines, { showLineNumbers: true }]],
  },
});

export default withMDX({ ...defaultConfig, ...nextConfig });
