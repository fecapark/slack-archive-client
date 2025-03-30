'use client'

import ReactMarkdown, { RuleType } from 'markdown-to-jsx'
import { Noto_Sans_KR } from 'next/font/google'
import { AnchorHTMLAttributes, HTMLAttributes } from 'react'

import { Code } from '@/components/SlackMarkdown/components/Code'
import { CodeBlock } from '@/components/SlackMarkdown/components/CodeBlock'
import { InlineEmoji } from '@/components/SlackMarkdown/components/InlineEmoji'
import { MdImage } from '@/components/SlackMarkdown/components/MdImage'
import { MdLink } from '@/components/SlackMarkdown/components/MdLink'
import { MentionSpan } from '@/components/SlackMarkdown/components/MentionSpan'
import {
  convertCodeBlockString,
  convertInlineEmojiString,
  convertLinkString,
  convertMentionString,
  convertNewLineToRawElement,
  convertStrikeString,
  decodeCodeBlockContent,
} from '@/components/SlackMarkdown/utils/convert'
import { parseDataset } from '@/components/SlackMarkdown/utils/dataset'
import { tramsformToHTMLAttributes } from '@/components/SlackMarkdown/utils/transform'
import { assertNonNullish } from '@/utils/assertion'

interface SlackMarkdownProps {
  children: string
  isEdited?: boolean
}

const NotoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
})

export const SlackMarkdown = ({ children, isEdited }: SlackMarkdownProps) => {
  const converts = [
    convertNewLineToRawElement,
    convertStrikeString,
    convertMentionString,
    convertCodeBlockString,
    convertLinkString,
    convertInlineEmojiString,
  ]

  return (
    <div
      className={`line-height-[22.0002px] text-[15px] text-[#1d1c1d] ${NotoSansKR.className} antialiased`}
      style={{
        fontVariantLigatures: 'common-ligatures',
      }}
    >
      <ReactMarkdown
        options={{
          renderRule(next, node, _, state) {
            if (node.type === RuleType.codeInline) {
              return <Code key={state.key}>{node.text}</Code>
            }
            return next()
          },
          overrides: {
            pre: (props) => {
              const p = tramsformToHTMLAttributes<HTMLAttributes<HTMLPreElement>>(props)
              const { content, codeblock } = parseDataset(p)

              if (codeblock && typeof content === 'string') {
                return <CodeBlock {...p}>{decodeCodeBlockContent(content)}</CodeBlock>
              }
              return <pre {...p} />
            },
            code: ({ children }) => {
              return <>{children}</>
            },
            // Next.js Image로 폴백해줘요.
            img: (props) => <MdImage {...props} alt={props.alt} />,
            span: (props) => {
              const p = tramsformToHTMLAttributes<HTMLAttributes<HTMLSpanElement>>(props)
              const dataset = parseDataset(p)

              if (dataset.mention) {
                return <MentionSpan {...p} />
              }
              if (dataset['emoji-url'] && dataset['emoji-name'] && dataset['emoji-size']) {
                const { 'emoji-url': url, 'emoji-name': name, 'emoji-size': size } = dataset
                if (
                  typeof url === 'string' &&
                  typeof name === 'string' &&
                  typeof size === 'string' &&
                  (size === 'large' || size === 'medium')
                ) {
                  return <InlineEmoji name={name} size={size} url={url} />
                }
              }
              return <span {...p} />
            },
            p: ({ children }) => <>{children}</>,
            b: ({ children }) => <em>{children}</em>,
            em: ({ children }) => <b>{children}</b>,
            a: (props) => {
              const p = tramsformToHTMLAttributes<AnchorHTMLAttributes<HTMLAnchorElement>>(props)
              assertNonNullish(p.href)
              return <MdLink {...p} href={p.href} />
            },
          },
        }}
      >
        {children && converts.reduce((acc, convert) => convert(acc), children)}
      </ReactMarkdown>
      {isEdited && <span className="text-[13px] text-[rgb(134,134,134)]"> (편집됨)</span>}
    </div>
  )
}
