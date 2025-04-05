'use client'

import { tv } from 'tailwind-variants'

import { MessageItem } from '@/apis/messages'
import { useScrollToMessageOnMountEffect } from '@/app/archives/[channelId]/[threadId]/hooks/useScrollToMessageOnMountEffect'
import { SlackMessageWithMenuItem } from '@/app/archives/[channelId]/components/SlackMessageWithMenuItem'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageAttachment } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'
interface SlackThreadMessageItemProps {
  message: MessageItem
  variants?: 'group-child' | 'group-head' | 'group-head-alone' | 'thread-head'
}

const group = tv({
  variants: {
    type: {
      'group-head': 'pt-2 pb-0',
      'group-head-alone': 'pt-2 pb-1',
      'group-child': 'pt-1 pb-0',
      'thread-head': 'pt-2 pb-1',
    },
  },
})

export const SlackThreadMessageItem = ({ message, variants }: SlackThreadMessageItemProps) => {
  useScrollToMessageOnMountEffect()

  return (
    <SlackMessageWithMenuItem
      channelId={message.channel.id}
      className={group({ type: variants })}
      data-message-id={message.ts}
      isFirstItem={variants === 'thread-head'}
      messageId={message.ts}
      threadId={message.threadTs}
    >
      <SlackMessageItem
        createdAt={message.ts}
        isBot={message.user.isBot}
        isGrouped={variants === 'group-child'}
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
