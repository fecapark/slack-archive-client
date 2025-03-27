'use client'

import { useRouter } from 'next/navigation'

import { MessageItem } from '@/apis/messages'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'

interface SlackThreadHeadItemProps {
  head: MessageItem
}

export const SlackThreadHeadItem = ({ head }: SlackThreadHeadItemProps) => {
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
        {head.text}
      </SlackMessageItem>
    </div>
  )
}
