import clsx from 'clsx'

type Props = React.HTMLAttributes<HTMLSpanElement>

export const MentionSpan = ({ children, className, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'mention-block',
        'text-slack-text-link bg-slack-mention-bg h-fit w-fit rounded-[3px] px-1 pb-0.5'
      )}
    >
      {children}
    </span>
  )
}
