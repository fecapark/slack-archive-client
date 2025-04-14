import clsx from 'clsx'
import { tv } from 'tailwind-variants'

interface BlockquoteProps {
  type: 'once' | 'twice'
}

const blockQuotePseudoElement = tv({
  slots: {
    before:
      'before:bg-slack-divider-inline before:absolute before:top-0 before:left-0 before:mr-2.5 before:block before:h-full before:w-1 before:content-[""]',
    after:
      'after:bg-slack-divider-inline after:absolute after:top-0 after:left-0 after:ml-2.5 after:block after:h-full after:w-1 after:content-[""]',
  },
})

const blockquote = tv({
  base: 'relative',
  variants: {
    type: {
      once: clsx('pl-4', blockQuotePseudoElement().before()),
      twice: clsx(
        'pl-[31px]',
        blockQuotePseudoElement().before(),
        blockQuotePseudoElement().after()
      ),
    },
  },
})

export const Blockquote = ({ children, type }: React.PropsWithChildren<BlockquoteProps>) => {
  return (
    <blockquote
      className={clsx(
        blockquote({ type }),
        'first:before:rounded-t-sm first:after:rounded-t-sm last:before:rounded-b-sm last:after:rounded-b-sm'
      )}
    >
      <span className="block min-h-[22px] leading-[22px]">{children}</span>
    </blockquote>
  )
}
