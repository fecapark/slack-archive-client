import clsx from 'clsx'
import Image from 'next/image'

import { toFileSrc } from '@/apis/file'
import { SlackMessageImage } from '@/components/Slack/SlackMessageItem/components/SlackMessageImage'
import { SlackMessageVideo } from '@/components/Slack/SlackMessageItem/components/SlackMessageVideo'
import { SlackMarkdown } from '@/components/SlackMarkdown'
import { MessageFileItem } from '@/types/schema'
import { convertSlackTimestampToISOString, formatTemplates } from '@/utils/date'
import { getFileType } from '@/utils/file'

interface SlackMessageItemProps {
  children: string // 마크다운 파싱을 위해 문자열로만 받아요.
  createdAt: string
  createdAtFormat?: keyof typeof formatTemplates
  files?: MessageFileItem[]
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
  files,
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
        <SlackMarkdown>{children}</SlackMarkdown>

        <div
          className={clsx(
            'flex flex-col',
            files?.every((file) => getFileType(file.mimetype) === 'image') &&
              'flex-row items-center'
          )}
        >
          {files?.map((file) => {
            const fileType = getFileType(file.mimetype)
            const src = toFileSrc(file.id, file.mimetype)

            if (fileType === 'image') {
              return <SlackMessageImage key={file.id} src={src} />
            }
            if (fileType === 'video') {
              return (
                <SlackMessageVideo
                  height={file.height}
                  key={file.id}
                  src={src}
                  width={file.width}
                />
              )
            }
            return undefined
          })}
        </div>
      </div>
    </div>
  )
}
