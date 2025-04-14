import { getChannel } from '@/apis/channels'
import { getThreads } from '@/apis/threads'
import { SlackThreadLinkItem } from '@/app/archives/[channelId]/components/SlackThreadLinkItem'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'
import { handleError } from '@/utils/error'

interface ChannelLayoutProps {
  params: Promise<{
    channelId: string
  }>
}

const fetchChannelPageData = async (channelId: string) => {
  const [channel, threads] = await Promise.all([getChannel(channelId), getThreads(channelId)])
  return { channel, threads }
}

const ChannelLayout = async ({ params, children }: React.PropsWithChildren<ChannelLayoutProps>) => {
  const { channelId } = await params

  try {
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
            {threads.map(({ head, archivedAt, metadata }) => (
              <SlackThreadLinkItem
                archivedAt={archivedAt}
                head={head}
                key={head.ts}
                metadata={metadata}
              />
            ))}
          </div>
        </ArchivePannel>
        {children}
      </div>
    )
  } catch (e) {
    return JSON.stringify(await handleError(e))
  }
}

export default ChannelLayout
