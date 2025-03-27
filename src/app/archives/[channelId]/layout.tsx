import { getChannel } from '@/apis/channels'
import { getThreads } from '@/apis/threads'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

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
    <>
      <ArchivePannel
        className="w-full"
        description={channel.description}
        title={
          <div className="flex items-center">
            <SidebarChannelIcon className="mr-1 size-4" /> {channel.name}
          </div>
        }
      >
        <div className="flex flex-col">
          {threads.map(({ head }) => (
            <div
              className="hover:bg-grey100 ease-ease cursor-pointer rounded-md px-4 py-3 transition-colors duration-300"
              key={head.ts}
            >
              <SlackMessageItem
                createdAt={head.ts}
                createdAtFormat="2월 3일, 오후 10:23"
                profileImageUrl={head.user.avatar}
                username={head.user.name}
              >
                {head.text}
              </SlackMessageItem>
            </div>
          ))}
        </div>
      </ArchivePannel>
      {children}
    </>
  )
}

export default ChannelLayout
