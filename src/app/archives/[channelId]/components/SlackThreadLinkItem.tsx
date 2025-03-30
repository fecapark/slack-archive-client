import { Suspense } from 'react'

import { ThreadItem } from '@/apis/threads'
import { SlackThreadInformation } from '@/app/archives/[channelId]/components/SlackThreadInformation'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

interface SlackThreadLinkItemProps {
  archivedAt: string
  head: ThreadItem['head']
}

export const SlackThreadLinkItem = ({ head, archivedAt }: SlackThreadLinkItemProps) => {
  return (
    <div className="hover:bg-grey100 ease-ease rounded-md px-4 py-3 transition-colors duration-300">
      <SlackMessageItem
        createdAt={head.ts}
        createdAtFormat="2월 3일, 오후 10:23"
        profileImageUrl={head.user.avatar}
        username={head.user.name}
      >
        <SlackMessageItem.Markdown isEdited={head.edited}>{head.text}</SlackMessageItem.Markdown>
        <SlackMessageItem.MediaList files={head.files ?? undefined} />
        <Suspense>
          <SlackThreadInformation
            archivedAt={archivedAt}
            channelId={head.channel}
            threadId={head.threadTs}
          />
        </Suspense>
      </SlackMessageItem>
    </div>
  )
}
