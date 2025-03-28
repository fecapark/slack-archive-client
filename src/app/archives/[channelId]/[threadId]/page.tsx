import { getMessages } from '@/apis/messages'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

interface ThreadPageProps {
  params: Promise<{
    threadId: string
  }>
}

const ThreadPage = async ({ params }: ThreadPageProps) => {
  const { threadId } = await params
  const messages = await getMessages(threadId)

  return (
    <ArchivePannel title="쓰레드">
      <div className="flex h-0 grow flex-col gap-4 overflow-y-auto">
        {messages.map((message) => (
          <SlackMessageItem
            createdAt={message.ts}
            isBot={message.user.isBot}
            key={message.ts}
            profileImageUrl={message.user.avatar}
            username={message.user.name}
          >
            {message.text}
          </SlackMessageItem>
        ))}
      </div>
    </ArchivePannel>
  )
}

export default ThreadPage
