import { getMessages } from '@/apis/messages'
import { SlackThreadHeadMessageItem } from '@/app/archives/[channelId]/[threadId]/components/SlackThreadHeadMessageItem'
import { SlackThreadMessageItem } from '@/app/archives/[channelId]/[threadId]/components/SlackThreadMessageItem'
import { groupMessagesWithSameUser } from '@/app/archives/[channelId]/[threadId]/utils/groupMessagesWithSameUser'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { formatTemplates } from '@/utils/date'

interface ThreadPageProps {
  params: Promise<{
    threadId: string
  }>
}

const ThreadPage = async ({ params }: ThreadPageProps) => {
  const { threadId } = await params
  const [headMessage, ...messages] = await getMessages(threadId)

  const groupedMessages = groupMessagesWithSameUser(messages)
  const { archivedAt } = headMessage.thread

  const getThreadListLink = () => {
    const channelId = headMessage.channel.id
    return `/archives/${channelId}`
  }

  return (
    <ArchivePannel
      className="w-full"
      closeLink={getThreadListLink()}
      description={`${formatTemplates['(2024년)? 2월 3일, 오후 10:23'](archivedAt)} 에 아카이브됨`}
      title="스레드"
    >
      <div className="flex h-0 grow flex-col overflow-y-auto">
        <SlackThreadHeadMessageItem message={headMessage} messageCount={messages.length} />
        {groupedMessages.map((messageGroup) => {
          const [groupHead, ...others] = messageGroup
          const isAlone = others.length === 0

          return (
            <div key={groupHead.ts}>
              <SlackThreadMessageItem
                message={groupHead}
                variants={isAlone ? 'group-head-alone' : 'group-head'}
              />
              {others.map((message) => (
                <SlackThreadMessageItem key={message.ts} message={message} variants="group-child" />
              ))}
            </div>
          )
        })}
      </div>
    </ArchivePannel>
  )
}

export default ThreadPage
