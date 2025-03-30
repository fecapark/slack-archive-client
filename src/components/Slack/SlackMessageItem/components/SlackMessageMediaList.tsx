import clsx from 'clsx'

import { toFileSrc } from '@/apis/file'
import { SlackMessageImage } from '@/components/Slack/SlackMessageItem/components/SlackMessageImage'
import { SlackMessageVideo } from '@/components/Slack/SlackMessageItem/components/SlackMessageVideo'
import { MessageFileItem } from '@/types/schema'
import { getFileType } from '@/utils/file'

interface SlackMessageMediaListProps {
  files: MessageFileItem[]
}

export const SlackMessageMediaList = ({ files }: SlackMessageMediaListProps) => {
  const isAllImage = files.every((file) => getFileType(file.mimetype) === 'image')

  const fileLabel = files.length === 1 ? files[0].name : `${files.length}개 파일`

  return (
    <div>
      <div className="mb-1 text-[13px] text-[rgba(29,28,29,0.7)]">{fileLabel}</div>
      <div className={clsx('flex flex-col', isAllImage && 'flex-row items-center')}>
        {files?.map((file) => {
          const fileType = getFileType(file.mimetype)
          const src = toFileSrc(file.id, file.mimetype)

          if (fileType === 'image') {
            return (
              <SlackMessageImage height={file.height} key={file.id} src={src} width={file.width} />
            )
          }
          if (fileType === 'video') {
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
