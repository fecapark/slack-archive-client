import clsx from 'clsx'

import { MessageItem } from '@/apis/messages'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

interface SlackThreadMessageItemProps {
  className?: string
  message: MessageItem
}

export const SlackThreadMessageItem = ({ message, className }: SlackThreadMessageItemProps) => {
  return (
    <div className={clsx('px-4 pt-2 pb-1', className)}>
      <SlackMessageItem
        createdAt={message.ts}
        files={message.files ?? undefined}
        isBot={message.user.isBot}
        isEdited={message.edited}
        profileImageUrl={message.user.avatar}
        username={message.user.name}
      >
        {message.text}
      </SlackMessageItem>
    </div>
  )
}
