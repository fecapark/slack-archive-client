import { SlackMessageLinkAttachment } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment/SlackMessageLinkAttachment'
import { SlackMessageSlackAttachment } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment/SlackMessageSlackAttachment'
import { MessageAttachmentItem } from '@/types/schema'

interface SlackMessageAttachmentProps {
  attachment: MessageAttachmentItem
}

export const SlackMessageAttachment = ({ attachment }: SlackMessageAttachmentProps) => {
  if (attachment.type === 'link') {
    return <SlackMessageLinkAttachment attachment={attachment} />
  }

  if (attachment.type === 'slack') {
    return <SlackMessageSlackAttachment attachment={attachment} />
  }

  return undefined
}
