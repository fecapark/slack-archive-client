import { Suspense } from 'react'

import { ChannelPanel } from '@/app/archives/[channelId]/components/ChannelPanel'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { Skeleton } from '@/components/Skeleton'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

interface ChannelLayoutProps {
  params: Promise<{
    channelId: string
  }>
}

const ChannelLayout = async ({ params, children }: React.PropsWithChildren<ChannelLayoutProps>) => {
  const { channelId } = await params

  return (
    <div className="relative flex items-center gap-2">
      <Suspense
        fallback={
          <ArchivePannel
            className="z-[1] w-full"
            closeLink={`/archives/${channelId}`}
            title={<Skeleton className="h-5 w-[240px]" />}
          >
            <div className="px-4 py-3">
              <SlackMessageItem.Skeleton />
            </div>
          </ArchivePannel>
        }
      >
        <ChannelPanel channelId={channelId} />
      </Suspense>
      {children}
    </div>
  )
}

export default ChannelLayout
