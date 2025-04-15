import Image from 'next/image'

import { Skeleton } from '@/components/Skeleton'
import { SlackMessageMediaList } from '@/components/Slack/SlackMessageItem/components/SlackMessageMediaList'
import { SlackMarkdown } from '@/components/SlackMarkdown'
import { MessageFileItem } from '@/types/schema'
import { convertSlackTimestampToISOString, formatTemplates } from '@/utils/date'

interface SlackMessageItemProps {
  createdAt: string
  createdAtFormat?: keyof typeof formatTemplates
  isBot?: boolean
  isGrouped?: boolean
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

const SlackMessageItemSkeleton = () => {
  return (
    <div className="flex">
      <div className="mr-2 shrink-0">
        <div className="overflow-hidden rounded-md">
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
      <div className="flex flex-[1_1_0] flex-col gap-[9px]">
        <div className="flex items-center">
          <Skeleton className="h-[15px] w-full max-w-[250px]" />
        </div>
        <Skeleton className="h-[15px] w-full" />
        <Skeleton className="h-[15px] w-full" />
      </div>
    </div>
  )
}

export const SlackMessageItem = ({
  children,
  profileImageUrl,
  username,
  createdAt,
  createdAtFormat = '(2024년)? 2월 3일, 오후 10:23',
  isBot,
  isGrouped,
}: React.PropsWithChildren<SlackMessageItemProps>) => {
  return (
    <div className="flex">
      {isGrouped && (
        <div className="ease-ease text-slack-text-secondary mr-2 h-fit w-9 shrink-0 text-right text-xs leading-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {formatTemplates['10:00'](convertSlackTimestampToISOString(createdAt))}
        </div>
      )}
      {!isGrouped && (
        <div className="mr-2 shrink-0">
          <div className="overflow-hidden rounded-md">
            <Image alt="Avatar" height={36} src={profileImageUrl} unoptimized width={36} />
          </div>
        </div>
      )}
      <div className="flex-[1_1_0]">
        {!isGrouped && (
          <div className="-mt-1 flex items-center">
            <span className="text-slack-text-primary text-[15px] font-bold">{username}</span>
            {isBot && (
              <span className="text-slack-text-opacity700 bg-slack-stroke-decorative ml-1 flex h-[14px] items-center rounded-xs px-[3px] py-[1px] text-[10px] font-bold">
                앱
              </span>
            )}
            &nbsp;&nbsp;
            <span className="text-slack-text-secondary text-xs">
              {formatTemplates[createdAtFormat](convertSlackTimestampToISOString(createdAt))}
            </span>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

SlackMessageItem.MediaList = MediaList
SlackMessageItem.Markdown = Markdown
SlackMessageItem.Skeleton = SlackMessageItemSkeleton
