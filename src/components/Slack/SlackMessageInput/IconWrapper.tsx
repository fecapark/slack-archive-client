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
        'm-0.5 inline-flex size-7 items-center justify-center p-0.5',
        containerClassName
      )}
    >
      <div className={clsx('text-slack-text-opacity700 size-4.5', className)}>{children}</div>
    </div>
  )
}
