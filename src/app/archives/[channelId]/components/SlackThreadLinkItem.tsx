'use client'

import { ThreadItem } from '@/apis/threads'
import { SlackMessageMenu } from '@/app/archives/[channelId]/components/SlackMessageMenu'
import { SlackThreadInformation } from '@/app/archives/[channelId]/components/SlackThreadInformation'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageAttachment } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'

type SlackThreadLinkItemProps = Pick<ThreadItem, 'head' | 'metadata'> & {
  archivedAt: string
}

export const SlackThreadLinkItem = ({ head, archivedAt, metadata }: SlackThreadLinkItemProps) => {
  return (
    <div
      className="hover:bg-grey100 ease-ease relative rounded-md px-4 py-3 transition-colors duration-300"
      data-thread-id={head.threadTs}
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

      <SlackMessageMenu channelId={head.channel} threadId={head.threadTs} />
    </div>
  )
}
