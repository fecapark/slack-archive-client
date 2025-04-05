'use client'

import clsx from 'clsx'

import { MessageItem } from '@/apis/messages'
import { useScrollToMessageOnMountEffect } from '@/app/archives/[channelId]/[threadId]/hooks/useScrollToMessageOnMountEffect'
import { SlackMessageMenu } from '@/app/archives/[channelId]/components/SlackMessageMenu'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageAttachment } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'

interface SlackThreadMessageItemProps {
  className?: string
  message: MessageItem
}

export const SlackThreadMessageItem = ({ message, className }: SlackThreadMessageItemProps) => {
  useScrollToMessageOnMountEffect()

  return (
    <div
      className={clsx(
        'hover:bg-grey100 ease-ease relative rounded-md px-4 pt-2 pb-1 transition-colors duration-300',
        className
      )}
      data-message-id={message.ts}
    >
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
        {message.attachments?.map((attachment) => {
          return <SlackMessageAttachment attachment={attachment} key={attachment.url} />
        })}
        {message.reactions && <SlackMessageReactionList reactions={message.reactions} />}
      </SlackMessageItem>

      <SlackMessageMenu
        channelId={message.channel.id}
        messageId={message.ts}
        threadId={message.threadTs}
      />
    </div>
  )
}
