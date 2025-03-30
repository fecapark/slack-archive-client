import { getChannel } from '@/apis/channels'
import { getThreads } from '@/apis/threads'
import { SlackThreadLinkItem } from '@/app/archives/[channelId]/components/SlackThreadLinkItem'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'

interface ChannelLayoutProps {
  params: Promise<{
    channelId: string
  }>
}

const ChannelLayout = async ({ params, children }: React.PropsWithChildren<ChannelLayoutProps>) => {
  const { channelId } = await params
  const channel = await getChannel(channelId)
  const threads = await getThreads(channelId)

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
          {threads.map(({ head }) => (
            <SlackThreadLinkItem head={head} key={head.ts} />
          ))}
        </div>
      </ArchivePannel>
      {children}
    </div>
  )
}

export default ChannelLayout
