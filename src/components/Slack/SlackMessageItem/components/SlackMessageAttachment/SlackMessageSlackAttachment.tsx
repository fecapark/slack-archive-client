import Link from 'next/link'

import { SlackMessageAttachmentLayout } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment/SlackMessageAttachmentLayout'
import { MessageSlackAttachmentItem } from '@/types/schema'
import { convertSlackTimestampToISOString, formatTemplates } from '@/utils/date'

interface SlackMessageSlackAttachmentProps {
  attachment: MessageSlackAttachmentItem
}

export const SlackMessageSlackAttachment = ({ attachment }: SlackMessageSlackAttachmentProps) => {
  return (
    <SlackMessageAttachmentLayout>
      <SlackMessageAttachmentLayout.Header imageUrl={attachment.authorIcon}>
        {attachment.authorName}
      </SlackMessageAttachmentLayout.Header>
      <SlackMessageAttachmentLayout.Text markdown>
        {attachment.text ?? ''}
      </SlackMessageAttachmentLayout.Text>
      <div className="flex items-center gap-1 pt-1 text-xs text-[rgb(97,96,97)]">
        <div>
          {formatTemplates['(2024년)? 2월 3일, 오후 10:23'](
            convertSlackTimestampToISOString(attachment.ts)
          )}
        </div>
        <div className="text-[rgb(221,221,221)]">{' | '}</div>
        <Link
          className="text-[rgb(18,100,163)] hover:underline"
          href={attachment.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          메시지 보기
        </Link>
      </div>
    </SlackMessageAttachmentLayout>
  )
}
