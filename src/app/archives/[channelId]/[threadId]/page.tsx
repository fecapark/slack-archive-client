import { getMessages } from '@/apis/messages'
import { SlackThreadHeadMessageItem } from '@/app/archives/[channelId]/[threadId]/components/SlackThreadHeadMessageItem'
import { SlackThreadMessageItem } from '@/app/archives/[channelId]/[threadId]/components/SlackThreadMessageItem'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'

interface ThreadPageProps {
  params: Promise<{
    threadId: string
  }>
}

const ThreadPage = async ({ params }: ThreadPageProps) => {
  const { threadId } = await params
  const [headMessage, ...messages] = await getMessages(threadId)

  const getThreadListLink = () => {
    const channelId = messages[0].channel.id
    return `/archives/${channelId}`
  }

  return (
    <ArchivePannel className="w-full" closeLink={getThreadListLink()} title="쓰레드">
      <div className="flex h-0 grow flex-col overflow-y-auto">
        <SlackThreadHeadMessageItem
          key={headMessage.ts}
          message={headMessage}
          messageCount={messages.length}
        />
        {messages.map((message) => (
          <SlackThreadMessageItem key={message.ts} message={message} />
        ))}
      </div>
    </ArchivePannel>
  )
}

export default ThreadPage
