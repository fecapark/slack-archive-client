import { SlackMessageAttachmentLayout } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment/SlackMessageAttachmentLayout'
import { MessageLinkAttachmentItem } from '@/types/schema'

interface SlackMessageLinkAttachmentProps {
  attachment: MessageLinkAttachmentItem
}

export const SlackMessageLinkAttachment = ({ attachment }: SlackMessageLinkAttachmentProps) => {
  return (
    <SlackMessageAttachmentLayout>
      <SlackMessageAttachmentLayout.Header imageUrl={attachment.serviceIcon}>
        {attachment.serviceName}
      </SlackMessageAttachmentLayout.Header>
      <SlackMessageAttachmentLayout.TitleLink href={attachment.titleLink}>
        {attachment.title}
      </SlackMessageAttachmentLayout.TitleLink>
      <SlackMessageAttachmentLayout.Text>{attachment.text}</SlackMessageAttachmentLayout.Text>
      {!!attachment.imageUrl && (
        <div className="mt-1.5 w-full max-w-[360px] overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="favicon" className="w-full object-contain" src={attachment.imageUrl} />
        </div>
      )}
    </SlackMessageAttachmentLayout>
  )
}
