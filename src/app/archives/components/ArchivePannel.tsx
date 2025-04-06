import clsx from 'clsx'
import Link from 'next/link'
import { MdClose } from 'react-icons/md'

interface ArchivePannelProps {
  className?: string
  closeLink?: string
  description?: string
  title: React.ReactNode
}

export const ArchivePannel = ({
  children,
  title,
  description,
  className,
  closeLink,
}: React.PropsWithChildren<ArchivePannelProps>) => {
  return (
    <div
      className={clsx('flex h-full flex-col rounded-none bg-white p-2 md:rounded-2xl', className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="mr-1 p-2 text-base font-bold">{title}</div>
          <div className="text-grey600 text-[13px]">{description}</div>
        </div>
        {closeLink && (
          <Link className="mr-2" href={closeLink}>
            <div className="ase-ease hover:bg-grey100 rounded-md p-2 text-xl transition-colors duration-300">
              <MdClose />
            </div>
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}
