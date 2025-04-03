import { ThreadItem } from '@/apis/threads'
import { SlackThreadInformation } from '@/app/archives/[channelId]/components/SlackThreadInformation'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { SlackMessageReactionList } from '@/components/Slack/SlackMessageItem/components/SlackMessageReactionList'
import { getQueryClient } from '@/utils/query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

type SlackThreadLinkItemProps = Pick<ThreadItem, 'head' | 'metadata'> & {
  archivedAt: string
}

export const SlackThreadLinkItem = ({ head, archivedAt, metadata }: SlackThreadLinkItemProps) => {
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
        {head.reactions && <SlackMessageReactionList reactions={head.reactions} />}
        <HydrationBoundary state={dehydrate(getQueryClient())}>
          <SlackThreadInformation
            archivedAt={archivedAt}
            channelId={head.channel}
            metadata={metadata}
            threadId={head.threadTs}
          />
        </HydrationBoundary>
      </SlackMessageItem>
    </div>
  )
}
