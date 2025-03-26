import clsx from 'clsx'

export const Code = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'm-[1px] h-fit rounded-[3px] border border-[rgba(29,28,29,0.13)] bg-[rgba(29,28,29,0.04)] px-[3px] pt-[2px] pb-[2px] text-xs font-bold text-[rgb(192,19,67)]'
      )}
    >
      {children}
    </code>
  )
}
