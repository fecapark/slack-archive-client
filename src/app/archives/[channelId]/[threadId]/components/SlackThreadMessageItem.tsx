'use client'

import { tv } from 'tailwind-variants'

import { MessageItem } from '@/apis/messages'
import { useScrollToMessageOnMountEffect } from '@/app/archives/[channelId]/[threadId]/hooks/useScrollToMessageOnMountEffect'
import { SlackMessageWithMenuItem } from '@/app/archives/[channelId]/components/SlackMessageWithMenuItem'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageAttachment } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'
interface SlackThreadMessageItemProps {
  isFirstItem?: boolean
  isGrouped?: boolean
  message: MessageItem
}

const group = tv({
  variants: {
    isGrouped: {
      true: 'pt-1 pb-0',
      false: 'pt-2 pb-1',
    },
  },
})

export const SlackThreadMessageItem = ({
  message,
  isFirstItem,
  isGrouped,
}: SlackThreadMessageItemProps) => {
  useScrollToMessageOnMountEffect()

  return (
    <SlackMessageWithMenuItem
      channelId={message.channel.id}
      className={group({ isGrouped })}
      data-message-id={message.ts}
      isFirstItem={isFirstItem}
      threadId={message.threadTs}
    >
      <SlackMessageItem
        createdAt={message.ts}
        isBot={message.user.isBot}
        isGrouped={isGrouped}
        profileImageUrl={message.user.avatar}
        username={message.user.name}
      >
        <SlackMessageItem.Markdown isEdited={message.edited}>
          {message.text}
        </SlackMessageItem.Markdown>
        <SlackMessageItem.MediaList files={message.files ?? undefined} />
        {message.attachments?.map((attachment) => {
          return <SlackMessageAttachment attachment={attachment} key={attachment.id} />
        })}
        {message.reactions && <SlackMessageReactionList reactions={message.reactions} />}
      </SlackMessageItem>
    </SlackMessageWithMenuItem>
  )
}
