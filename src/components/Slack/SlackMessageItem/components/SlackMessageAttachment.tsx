import Link from 'next/link'

import { MessageAttachmentItem } from '@/types/schema'

interface SlackMessageAttachmentProps {
  attachment: MessageAttachmentItem
}

export const SlackMessageAttachment = ({ attachment }: SlackMessageAttachmentProps) => {
  if (attachment.type !== 'link') {
    return undefined
  }

  return (
    <div className="mb-2 flex max-w-[600px]">
      <div className="w-1 shrink-0 rounded-md bg-[rgb(221,221,221)]" />
      <div className="px-3 text-[15px]">
        <div className="flex items-center">
          <div className="mr-2 mb-[3px] size-4">
            {/* 이미지 호스트의 URL을 예측할 수 없기 때문에 HTML img 태그로 변경해요. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="favicon" className="size-full object-contain" src={attachment.serviceIcon} />
          </div>
          <div className="font-bold">{attachment.serviceName}</div>
        </div>
        <div>
          <Link
            className="font-bold text-[rgb(18,100,163)] hover:underline"
            href={attachment.titleLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            {attachment.title}
          </Link>
        </div>
        <div>{attachment.text}</div>
        {!!attachment.imageUrl && (
          <div className="mt-1.5 w-full max-w-[360px] overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="favicon" className="w-full object-contain" src={attachment.imageUrl} />
          </div>
        )}
      </div>
    </div>
  )
}
