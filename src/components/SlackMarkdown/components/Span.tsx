import clsx from 'clsx'

type SpanProps = React.HTMLAttributes<HTMLSpanElement>

export const Span = ({ children, ...props }: SpanProps) => {
  return <span {...props}>{children}</span>
}

export const MentionSpan = ({ children, className, ...props }: SpanProps) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'mention-block',
        'h-fit w-fit rounded-[3px] bg-[rgba(29,155,209,0.1)] px-1 py-0.5 text-[rgb(18,100,163)]'
      )}
    >
      {children}
    </span>
  )
}
