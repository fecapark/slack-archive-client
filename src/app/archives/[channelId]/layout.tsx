import { getChannel } from '@/apis/channels'
import { ChannelPanel } from '@/app/archives/[channelId]/components/ChannelPanel'

interface ChannelLayoutProps {
  params: Promise<{
    channelId: string
  }>
}

const ChannelLayout = async ({ params, children }: React.PropsWithChildren<ChannelLayoutProps>) => {
  const { channelId } = await params
  const channel = await getChannel(channelId)

  return (
    <div className="relative flex items-center gap-2">
      <ChannelPanel channel={channel} />
      {children}
    </div>
  )
}

export default ChannelLayout
