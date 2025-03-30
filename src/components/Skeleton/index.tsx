import clsx from 'clsx'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={clsx('bg-grey100 animate-pulse', className)} />
}
