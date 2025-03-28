import clsx from 'clsx'

type Props = React.HTMLAttributes<HTMLSpanElement>

export const MentionSpan = ({ children, className, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'mention-block',
        'h-fit w-fit rounded-[3px] bg-[rgba(29,155,209,0.1)] px-1 pb-0.5 text-[rgb(18,100,163)]'
      )}
    >
      {children}
    </span>
  )
}
