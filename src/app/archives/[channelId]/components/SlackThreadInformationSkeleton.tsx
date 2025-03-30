import { Skeleton } from '@/components/Skeleton'

export const SlackThreadInformationSkeleton = () => {
  return (
    <div className="mb-1 flex items-center py-1">
      <Skeleton className="mr-1 size-6 rounded-md" />
      <Skeleton className="mr-1 size-6 rounded-md" />
      <Skeleton className="mr-1 size-6 rounded-md" />
      <Skeleton className="mr-1 size-6 rounded-md" />
      <Skeleton className="ml-1 h-4 w-[64px] rounded-md" />
      <Skeleton className="ml-2 h-4 w-[186px] rounded-md" />
    </div>
  )
}
