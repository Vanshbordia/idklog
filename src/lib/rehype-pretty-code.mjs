import rehypePrettyCode from 'rehype-pretty-code'
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'

export default function rehypePrettyCodeWithTransformers() {
  return rehypePrettyCode({
    theme: { dark: 'github-dark', light: 'github-light' },
    keepBackground: false,
    defaultColor: 'css-variables',
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
    ],
  })
}
