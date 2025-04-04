import clsx from 'clsx'
import { Suspense } from 'react'

import { MessageItem } from '@/apis/messages'
import { SlackMessageMenu } from '@/app/archives/[channelId]/components/SlackMessageMenu'
import { useAllLinksInText } from '@/app/archives/[channelId]/hooks/useAllLinksInText'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageLinkPreview } from '@/components/Slack/SlackMessageItem/components/SlackMessageLinkPreivew'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'

interface SlackThreadMessageItemProps {
  className?: string
  message: MessageItem
}

export const SlackThreadMessageItem = ({ message, className }: SlackThreadMessageItemProps) => {
  const links = useAllLinksInText(message.text)
  return (
    <div
      className={clsx(
        'hover:bg-grey100 ease-ease relative rounded-md px-4 pt-2 pb-1 transition-colors duration-300',
        className
      )}
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
        {links.map((link) => {
          return (
            <Suspense key={link}>
              <SlackMessageLinkPreview url={link} />
            </Suspense>
          )
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
