import clsx from 'clsx'

interface IconWrapperProps {
  className?: string
  containerClassName?: string
}

export const IconWrapper = ({
  children,
  className,
  containerClassName,
}: React.PropsWithChildren<IconWrapperProps>) => {
  return (
    <div
      className={clsx(
        'm-0.5 inline-flex h-[28px] w-[28px] items-center justify-center p-0.5',
        containerClassName
      )}
    >
      <div className={clsx('size-4.5 text-[rgba(29,28,29,0.7)]', className)}>{children}</div>
    </div>
  )
}
