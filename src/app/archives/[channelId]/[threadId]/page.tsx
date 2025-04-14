import { Suspense } from 'react'

import { ThreadPannel } from '@/app/archives/[channelId]/[threadId]/components/ThreadPannel'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

interface ThreadPageProps {
  params: Promise<{
    channelId: string
    threadId: string
  }>
}

const ThreadPage = async ({ params }: ThreadPageProps) => {
  const { threadId, channelId } = await params

  return (
    <Suspense
      fallback={
        <ArchivePannel className="z-[2] w-full" closeLink={`/archives/${channelId}`} title="스레드">
          <div className="px-4 py-3">
            <SlackMessageItem.Skeleton />
          </div>
        </ArchivePannel>
      }
    >
      <ThreadPannel channelId={channelId} threadId={threadId} />
    </Suspense>
  )
}

export default ThreadPage
