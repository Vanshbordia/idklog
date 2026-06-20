import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { CodeBlock } from '@/components/code-block'
import { CustomFigure } from '@/components/custom-figure'

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-mono">{children}</h1>
  ),
  figure: ({ children }) => (
    <CustomFigure>{children}</CustomFigure>
  ),
  pre: ({ children, ...props }) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      {...(props as ImageProps)}
    />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}