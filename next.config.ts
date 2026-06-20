import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import { resolve } from 'path'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ['remark-frontmatter', { type: 'yaml', marker: '-' }],
      'remark-mdx-frontmatter',
      'remark-gfm',
      'remark-math',
    ],
    rehypePlugins: [
      [resolve(process.cwd(), 'src/lib/rehype-pretty-code.mjs')],
      ['rehype-katex', { strict: true, throwOnError: true }],
    ],
  },
})

export default withMDX(nextConfig);
