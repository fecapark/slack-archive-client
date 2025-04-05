'use client'

import { ThreadItem } from '@/apis/threads'
import { SlackMessageWithMenuItem } from '@/app/archives/[channelId]/components/SlackMessageWithMenuItem'
import { SlackThreadInformation } from '@/app/archives/[channelId]/components/SlackThreadInformation'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageAttachment } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'

type SlackThreadLinkItemProps = Pick<ThreadItem, 'head' | 'metadata'> & {
  archivedAt: string
  isFirstItem?: boolean
}

export const SlackThreadLinkItem = ({
  head,
  archivedAt,
  metadata,
  isFirstItem,
}: SlackThreadLinkItemProps) => {
  return (
    <SlackMessageWithMenuItem
      channelId={head.channel}
      data-thread-id={head.threadTs}
      isFirstItem={isFirstItem}
      threadId={head.threadTs}
    >
      <SlackMessageItem
        createdAt={head.ts}
        createdAtFormat="2월 3일, 오후 10:23"
        profileImageUrl={head.user.avatar}
        username={head.user.name}
      >
        <SlackMessageItem.Markdown isEdited={head.edited}>{head.text}</SlackMessageItem.Markdown>
        <SlackMessageItem.MediaList files={head.files ?? undefined} />
        {head.attachments?.map((attachment) => {
          return <SlackMessageAttachment attachment={attachment} key={attachment.url} />
        })}
        {head.reactions && <SlackMessageReactionList reactions={head.reactions} />}
        <SlackThreadInformation
          archivedAt={archivedAt}
          channelId={head.channel}
          metadata={metadata}
          threadId={head.threadTs}
        />
      </SlackMessageItem>
    </SlackMessageWithMenuItem>
  )
}
