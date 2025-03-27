import clsx from 'clsx'

interface ArchivePannelProps {
  className?: string
  description?: string
  title: React.ReactNode
}

export const ArchivePannel = ({
  children,
  title,
  description,
  className,
}: React.PropsWithChildren<ArchivePannelProps>) => {
  return (
    <div className={clsx('h-full rounded-2xl bg-white p-2', className)}>
      <div className="flex items-center gap-1">
        <div className="mr-1 p-2 text-base font-bold">{title}</div>
        <div className="text-grey600 text-[13px]">{description}</div>
      </div>
      {children}
    </div>
  )
}
