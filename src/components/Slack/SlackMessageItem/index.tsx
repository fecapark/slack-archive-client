import Image from 'next/image'

import { SlackMessageMediaList } from '@/components/Slack/SlackMessageItem/components/SlackMessageMediaList'
import { SlackMarkdown } from '@/components/SlackMarkdown'
import { MessageFileItem } from '@/types/schema'
import { convertSlackTimestampToISOString, formatTemplates } from '@/utils/date'

interface SlackMessageItemProps {
  createdAt: string
  createdAtFormat?: keyof typeof formatTemplates
  isBot?: boolean
  profileImageUrl: string
  username: string
}

interface SlackMessageMediaListProps {
  files?: MessageFileItem[]
}

interface SlackMarkdownProps {
  children: string // 마크다운 파싱을 위해 문자열로만 받아요.
  isEdited?: boolean
}

const Markdown = ({ children, isEdited }: SlackMarkdownProps) => {
  return (
    <div className="mb-1">
      <SlackMarkdown isEdited={isEdited}>{children}</SlackMarkdown>
    </div>
  )
}

const MediaList = ({ files }: SlackMessageMediaListProps) => {
  if (!files) {
    return undefined
  }
  return <SlackMessageMediaList files={files} />
}

export const SlackMessageItem = ({
  children,
  profileImageUrl,
  username,
  createdAt,
  createdAtFormat = '(2024년)? 2월 3일, 오후 10:23',
  isBot,
}: React.PropsWithChildren<SlackMessageItemProps>) => {
  return (
    <div className="flex">
      <div className="mr-2 shrink-0">
        <div className="overflow-hidden rounded-md">
          <Image alt="Avatar" height={36} src={profileImageUrl} width={36} />
        </div>
      </div>
      <div className="flex-[1_1_0]">
        <div className="-mt-1 flex items-center">
          <span className="text-[15px] font-bold text-[#1d1c1d]">{username}</span>
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

        {children}
      </div>
    </div>
  )
}

SlackMessageItem.MediaList = MediaList
SlackMessageItem.Markdown = Markdown
