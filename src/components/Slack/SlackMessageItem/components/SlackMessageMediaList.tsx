import clsx from 'clsx'

import { toAttatchmentSrc } from '@/apis/attatchment'
import { SlackMessageImage } from '@/components/Slack/SlackMessageItem/components/SlackMessageImage'
import { SlackMessageVideo } from '@/components/Slack/SlackMessageItem/components/SlackMessageVideo'
import { MessageFileItem } from '@/types/schema'
import { getAttatchmentType } from '@/utils/attatchment'

interface SlackMessageMediaListProps {
  files: MessageFileItem[]
}

export const SlackMessageMediaList = ({ files }: SlackMessageMediaListProps) => {
  const isAllImage = files.every((file) => getAttatchmentType(file.mimetype) === 'image')

  const fileLabel = files.length === 1 ? files[0].name : `${files.length}개 파일`

  return (
    <div>
      <div className="text-slack-text-opacity700 mb-1 text-[13px]">{fileLabel}</div>
      <div className={clsx('flex flex-col', isAllImage && 'flex-row items-center')}>
        {files?.map((file) => {
          const attatchmentType = getAttatchmentType(file.mimetype)
          const src = toAttatchmentSrc(file.id, file.mimetype)

          if (attatchmentType === 'image') {
            return (
              <SlackMessageImage height={file.height} key={file.id} src={src} width={file.width} />
            )
          }
          if (attatchmentType === 'video') {
            return (
              <SlackMessageVideo height={file.height} key={file.id} src={src} width={file.width} />
            )
          }
          return undefined
        })}
      </div>
    </div>
  )
}
