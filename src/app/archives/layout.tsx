import { getChannels } from '@/apis/channels'
import { getChannelsQueryKey, getThreadsQueryKey } from '@/apis/keys'
import { getThreads } from '@/apis/threads'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelItem } from '@/app/archives/components/SidebarChannelItem'
import { withDehydratedState } from '@/utils/query'
import { HydrationBoundary } from '@tanstack/react-query'

const fetchArchivesPageData = withDehydratedState(async ({ queryClient }) => {
  const channels = await getChannels()

  queryClient.setQueryData(getChannelsQueryKey(), channels)

  await Promise.all(
    channels.map((channel) =>
      queryClient.prefetchQuery({
        queryKey: getThreadsQueryKey(channel.id),
        queryFn: () => getThreads(channel.id),
      })
    )
  )

  return {
    channels,
  }
})
const ArchivesLayout = async ({ children }: React.PropsWithChildren<unknown>) => {
  const { channels, dehydratedState } = await fetchArchivesPageData()

  return (
    <div className="relative grid h-full grid-cols-[1fr] grid-rows-[1fr] gap-2 overflow-hidden px-0 py-2 md:grid-cols-[320px_1fr] md:px-5">
      <ArchivePannel className="absolute z-[1] w-full md:static" title="채널">
        <div className="flex h-0 grow flex-col gap-1 overflow-y-auto">
          {channels.map((channel) => (
            <SidebarChannelItem channel={channel} key={channel.id} />
          ))}
        </div>
      </ArchivePannel>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </div>
  )
}

export default ArchivesLayout
