import { Suspense } from 'react'

import { ThreadPannel } from '@/app/archives/[channelId]/[threadId]/components/ThreadPannel'

interface ThreadPageProps {
  params: Promise<{
    channelId: string
    threadId: string
  }>
}

const ThreadPage = async ({ params }: ThreadPageProps) => {
  const { threadId, channelId } = await params

  return (
    <Suspense>
      <ThreadPannel channelId={channelId} threadId={threadId} />
    </Suspense>
  )
}

export default ThreadPage
