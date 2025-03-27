import Image from 'next/image'

import { SlackMarkdown } from '@/components/SlackMarkdown'
import { convertSlackTimestampToISOString, formatTemplates } from '@/utils/date'

interface SlackMessageItemProps {
  children: string // 마크다운 파싱을 위해 문자열로만 받아요.
  createdAt: string
  createdAtFormat?: keyof typeof formatTemplates
  isBot?: boolean
  profileImageUrl: string
  username: string
}

export const SlackMessageItem = ({
  children,
  profileImageUrl,
  username,
  createdAt,
  createdAtFormat = '오전 10:00',
  isBot,
}: SlackMessageItemProps) => {
  return (
    <div className="flex">
      <div className="mr-2 shrink-0">
        <div className="overflow-hidden rounded-md">
          <Image alt="Avatar" height={36} src={profileImageUrl} width={36} />
        </div>
      </div>
      <div className="flex-[1_1_0]">
        <div className="-mt-1 mb-0.5 flex items-center">
          <span className="font-bold text-[#1d1c1d]">{username}</span>
          {isBot && (
            <span className="ml-1 flex h-[14px] items-center rounded-xs bg-[rgba(29,28,29,0.13)] px-[3px] py-[1px] text-[10px] font-bold text-[rgba(29,28,29,0.7)]">
              앱
            </span>
          )}
          &nbsp;&nbsp;
          <span className="text-xs text-[#616061]">
            {formatTemplates[createdAtFormat](convertSlackTimestampToISOString(createdAt))}
          </span>
        </div>
        <SlackMarkdown>{children}</SlackMarkdown>
      </div>
    </div>
  )
}
