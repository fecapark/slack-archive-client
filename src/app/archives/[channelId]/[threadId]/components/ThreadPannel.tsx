'use client'

import { SlackThreadHeadMessageItem } from '@/app/archives/[channelId]/[threadId]/components/SlackThreadHeadMessageItem'
import { SlackThreadMessageItem } from '@/app/archives/[channelId]/[threadId]/components/SlackThreadMessageItem'
import { useGroupedMessagesQuery } from '@/app/archives/[channelId]/[threadId]/hooks/useGroupedMessagesQuery'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { formatTemplates } from '@/utils/date'

interface ThreadPannelProps {
  channelId: string
  threadId: string
}

export const ThreadPannel = ({ channelId, threadId }: ThreadPannelProps) => {
  const { headMessage, groupedMessages, messagesCount } = useGroupedMessagesQuery(threadId)
  const { archivedAt } = headMessage.thread

  return (
    <ArchivePannel
      className="z-[2] w-full"
      closeLink={`/archives/${channelId}`}
      description={`${formatTemplates['(2024년)? 2월 3일, 오후 10:23'](archivedAt)} 에 아카이브됨`}
      title="스레드"
    >
      <div className="flex h-0 grow flex-col overflow-y-auto">
        <SlackThreadHeadMessageItem message={headMessage} messageCount={messagesCount} />
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
