import { Suspense } from 'react'

import { ThreadItem } from '@/apis/threads'
import { SlackMessageMenu } from '@/app/archives/[channelId]/components/SlackMessageMenu'
import { SlackThreadInformation } from '@/app/archives/[channelId]/components/SlackThreadInformation'
import { useAllLinksInText } from '@/app/archives/[channelId]/hooks/useAllLinksInText'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageLinkPreview } from '@/components/Slack/SlackMessageItem/components/SlackMessageLinkPreivew'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'

type SlackThreadLinkItemProps = Pick<ThreadItem, 'head' | 'metadata'> & {
  archivedAt: string
}

export const SlackThreadLinkItem = ({ head, archivedAt, metadata }: SlackThreadLinkItemProps) => {
  const links = useAllLinksInText(head.text)
  return (
    <div className="hover:bg-grey100 ease-ease relative rounded-md px-4 py-3 transition-colors duration-300">
      <SlackMessageItem
        createdAt={head.ts}
        createdAtFormat="2월 3일, 오후 10:23"
        profileImageUrl={head.user.avatar}
        username={head.user.name}
      >
        <SlackMessageItem.Markdown isEdited={head.edited}>{head.text}</SlackMessageItem.Markdown>
        <SlackMessageItem.MediaList files={head.files ?? undefined} />
        {links.map((link) => {
          return (
            <Suspense key={link}>
              <SlackMessageLinkPreview url={link} />
            </Suspense>
          )
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
