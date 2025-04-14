import clsx from 'clsx'

export const Code = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'border-slack-stroke-decorative bg-slack-codeblock-bg text-slack-text-inline-code m-[1px] h-fit rounded-[3px] border px-[3px] pt-0.5 pb-0.5 text-xs'
      )}
    >
      {children}
    </code>
  )
}
