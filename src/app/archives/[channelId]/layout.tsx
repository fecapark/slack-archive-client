import { getChannel } from '@/apis/channels'
import { getMessages } from '@/apis/messages'
import { getThreads } from '@/apis/threads'
import { SlackThreadLinkItem } from '@/app/archives/[channelId]/components/SlackThreadLinkItem'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'
import { getQueryClient } from '@/utils/query'

interface ChannelLayoutProps {
  params: Promise<{
    channelId: string
  }>
}

const fetchChannelPageData = async (channelId: string) => {
  const getThreadsWithPrefetch = async (channelId: string) => {
    const queryClient = getQueryClient()
    const threads = await getThreads(channelId)
    const prefetch = (threadId: string) =>
      queryClient.fetchQuery({
        queryKey: ['thread', threadId],
        queryFn: () => getMessages(threadId),
      })
    await Promise.all(threads.map(({ head }) => prefetch(head.threadTs)))
    return threads
  }

  const [channel, threads] = await Promise.all([
    getChannel(channelId),
    getThreadsWithPrefetch(channelId),
  ])
  return { channel, threads }
}

const ChannelLayout = async ({ params, children }: React.PropsWithChildren<ChannelLayoutProps>) => {
  const { channelId } = await params
  const { channel, threads } = await fetchChannelPageData(channelId)

  return (
    <div className="flex items-center gap-2">
      <ArchivePannel
        className="w-full"
        description={channel.description}
        title={
          <div className="flex items-center">
            <SidebarChannelIcon className="mr-1 size-4" /> {channel.name}
          </div>
        }
      >
        <div className="flex h-0 grow flex-col overflow-y-auto">
          {threads.map(({ head, archivedAt }) => (
            <SlackThreadLinkItem archivedAt={archivedAt} head={head} key={head.ts} />
          ))}
        </div>
      </ArchivePannel>
      {children}
    </div>
  )
}

export default ChannelLayout
