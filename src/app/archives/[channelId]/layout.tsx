import { getChannel } from '@/apis/channels'
import { getMessagesQueryKey } from '@/apis/keys'
import { getMessages } from '@/apis/messages'
import { getThreads } from '@/apis/threads'
import { SlackThreadLinkItem } from '@/app/archives/[channelId]/components/SlackThreadLinkItem'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'
import { compareSlackTimestampDesc } from '@/utils/date'
import { getQueryClient } from '@/utils/query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface ChannelLayoutProps {
  params: Promise<{
    channelId: string
  }>
}

const fetchChannelPageData = async (channelId: string) => {
  const queryClient = getQueryClient()

  const [channel, threads] = await Promise.all([getChannel(channelId), getThreads(channelId)])
  await Promise.all(
    threads.map((thread) =>
      queryClient.prefetchQuery({
        queryKey: getMessagesQueryKey(thread.head.ts),
        queryFn: () => getMessages(thread.head.ts),
      })
    )
  )

  return {
    dehydratedState: dehydrate(queryClient),
    channel,
    threads: threads.toSorted((a, b) => compareSlackTimestampDesc(a.head.ts, b.head.ts)),
  }
}

const ChannelLayout = async ({ params, children }: React.PropsWithChildren<ChannelLayoutProps>) => {
  const { channelId } = await params
  const { dehydratedState, channel, threads } = await fetchChannelPageData(channelId)

  return (
    <div className="relative flex items-center gap-2">
      <ArchivePannel
        className="absolute z-[1] w-full md:static"
        closeLink="/archives"
        description={channel.description}
        title={
          <div className="flex items-center">
            <SidebarChannelIcon className="mr-1 size-4" /> {channel.name}
          </div>
        }
      >
        <div className="flex h-0 grow flex-col overflow-y-auto">
          {threads.map(({ head, archivedAt, metadata }, index) => (
            <SlackThreadLinkItem
              archivedAt={archivedAt}
              head={head}
              isFirstItem={index === 0}
              key={head.ts}
              metadata={metadata}
            />
          ))}
        </div>
      </ArchivePannel>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </div>
  )
}

export default ChannelLayout
