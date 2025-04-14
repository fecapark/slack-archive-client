import { Suspense } from 'react'

import { ChannelPanel } from '@/app/archives/[channelId]/components/ChannelPanel'

interface ChannelLayoutProps {
  params: Promise<{
    channelId: string
  }>
}

const ChannelLayout = async ({ params, children }: React.PropsWithChildren<ChannelLayoutProps>) => {
  const { channelId } = await params

  return (
    <div className="relative flex items-center gap-2">
      <Suspense>
        <ChannelPanel channelId={channelId} />
      </Suspense>
      {children}
    </div>
  )
}

export default ChannelLayout
