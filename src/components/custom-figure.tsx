import React from 'react'
import { CodeBlock } from '@/components/code-block'

interface CustomFigureProps {
  children: React.ReactNode
}

export function CustomFigure({ children }: CustomFigureProps) {
  let title = ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let codeChild: any = null

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props as Record<string, unknown>
      if (child.type === 'figcaption') {
        title = props.children as string
      } else {
        codeChild = child
      }
    }
  })

  if (!codeChild) {
    return <figure>{children}</figure>
  }

  if (codeChild.type === CodeBlock) {
    return React.cloneElement(codeChild, { title })
  }

  return (
    <CodeBlock className={codeChild.props.className as string} title={title}>
      {codeChild.props.children as React.ReactNode}
    </CodeBlock>
  )
}
