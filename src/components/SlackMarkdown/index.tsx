'use client'

import ReactMarkdown, { RuleType } from 'markdown-to-jsx'
import { HTMLAttributes } from 'react'

import { Code } from '@/components/SlackMarkdown/components/Code'
import { CodeBlock } from '@/components/SlackMarkdown/components/CodeBlock'
import { MdImage } from '@/components/SlackMarkdown/components/MdImage'
import { MentionSpan, Span } from '@/components/SlackMarkdown/components/Span'
import {
  convertCodeBlockString,
  convertMentionString,
  convertNewlineDouble,
  magicCodeBlockString,
} from '@/components/SlackMarkdown/utils/convert'
import { parseDataset } from '@/components/SlackMarkdown/utils/dataset'
import { tramsformToHTMLAttributes } from '@/components/SlackMarkdown/utils/transform'

export const SlackMarkdown = ({ children }: { children: string }) => {
  const converts = [convertMentionString, convertNewlineDouble, convertCodeBlockString]

  return (
    <ReactMarkdown
      className="text-[#1d1c1d]"
      options={{
        renderRule(next, node, _, state) {
          if (node.type === RuleType.codeInline && node.text.startsWith(magicCodeBlockString)) {
            const rawText = String.raw`${node.text.replace(magicCodeBlockString, '')}`
            return <CodeBlock key={state.key}>{rawText}</CodeBlock>
          }
          return next()
        },
        overrides: {
          code: (props) => <Code {...props} />,
          // Next.js Image로 폴백해줘요.
          img: (props) => <MdImage {...props} alt={props.alt} />,
          span: (props) => {
            const p = tramsformToHTMLAttributes<HTMLAttributes<HTMLSpanElement>>(props)
            const dataset = parseDataset(p)

            if (dataset.mention) {
              return <MentionSpan {...p} />
            }
            return <Span {...p} />
          },
          p: ({ children }) => <>{children}</>,
          b: ({ children }) => <em>{children}</em>,
          em: ({ children }) => <b>{children}</b>,
        },
      }}
    >
      {children && converts.reduce((acc, convert) => convert(acc), children)}
    </ReactMarkdown>
  )
}
