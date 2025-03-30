'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MdArrowForwardIos } from 'react-icons/md'

import { getMessages } from '@/apis/messages'
import { formatTemplates } from '@/utils/date'
import { useSuspenseQuery } from '@tanstack/react-query'

interface SlackThreadInformationProps {
  archivedAt: string
  channelId: string
  threadId: string
}

export const SlackThreadInformation = ({
  threadId,
  channelId,
  archivedAt,
}: SlackThreadInformationProps) => {
  const { data: messages } = useSuspenseQuery({
    queryKey: ['thread', threadId],
    queryFn: () => getMessages(threadId),
  })

  const getUniqueUserAvatars = () => {
    const uniqueAvatars = new Map<string, string>()
    messages.forEach((message) => {
      uniqueAvatars.set(message.user.id, message.user.avatar)
    })
    return [...uniqueAvatars.values()]
  }

  return (
    <Link href={`/archives/${channelId}/${threadId}`}>
      <div className="group ease-ease mb-1 -ml-1 flex max-w-[600px] items-center justify-between rounded-md border border-transparent p-1 text-[13px] transition-colors duration-300 hover:border hover:border-[rgba(29,28,29,0.13)] hover:bg-white">
        <div className="flex items-center">
          <div className="flex items-center">
            {getUniqueUserAvatars().map((avatar) => (
              <Image
                alt="User Avatar"
                className="mr-1 rounded-md"
                height={24}
                key={avatar}
                src={avatar}
                width={24}
              />
            ))}
          </div>
          <div className="ml-[3px] font-bold text-[rgb(18,100,163)] hover:underline">
            {messages.length - 1}개의 댓글
          </div>
          <div className="ml-2 text-[rgb(97,96,97)]">
            {formatTemplates['2월 3일, 오후 10:23'](archivedAt)} 에 아카이브됨
          </div>
        </div>
        <div className="ease-ease pr-1 text-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <MdArrowForwardIos />
        </div>
      </div>
    </Link>
  )
}
