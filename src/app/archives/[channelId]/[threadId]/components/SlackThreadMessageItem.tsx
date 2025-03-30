import clsx from 'clsx'

import { MessageItem } from '@/apis/messages'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'

interface SlackThreadMessageItemProps {
  className?: string
  message: MessageItem
}

export const SlackThreadMessageItem = ({ message, className }: SlackThreadMessageItemProps) => {
  return (
    <div className={clsx('px-4 pt-2 pb-1', className)}>
      <SlackMessageItem
        createdAt={message.ts}
        isBot={message.user.isBot}
        profileImageUrl={message.user.avatar}
        username={message.user.name}
      >
        <SlackMessageItem.Markdown isEdited={message.edited}>
          {message.text}
        </SlackMessageItem.Markdown>
        <SlackMessageItem.MediaList files={message.files ?? undefined} />
        {message.reactions && <SlackMessageReactionList reactions={message.reactions} />}
      </SlackMessageItem>
    </div>
  )
}
