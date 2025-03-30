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

  const getThreadListLink = () => {
    const channelId = messages[0].channel.id
    return `/archives/${channelId}`
  }

  return (
    <ArchivePannel closeLink={getThreadListLink()} title="쓰레드">
      <div className="flex h-0 grow flex-col gap-4 overflow-y-auto">
        {messages.map((message) => (
          <SlackMessageItem
            createdAt={message.ts}
            files={message.files ?? undefined}
            isBot={message.user.isBot}
            isEdited={message.edited}
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
