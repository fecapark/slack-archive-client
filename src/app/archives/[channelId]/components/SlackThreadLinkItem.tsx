'use client'

import { useRouter } from 'next/navigation'

import { ThreadItem } from '@/apis/threads'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

interface SlackThreadLinkItemProps {
  head: ThreadItem['head']
}

export const SlackThreadLinkItem = ({ head }: SlackThreadLinkItemProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/archives/${head.channel}/${head.ts}`)
  }

  return (
    <div
      className="hover:bg-grey100 ease-ease cursor-pointer rounded-md px-4 py-3 transition-colors duration-300"
      onClick={onClick}
    >
      <SlackMessageItem
        createdAt={head.ts}
        createdAtFormat="2월 3일, 오후 10:23"
        profileImageUrl={head.user.avatar}
        username={head.user.name}
      >
        <SlackMessageItem.Markdown isEdited={head.edited}>{head.text}</SlackMessageItem.Markdown>
        <SlackMessageItem.MediaList files={head.files ?? undefined} />
      </SlackMessageItem>
    </div>
  )
}
