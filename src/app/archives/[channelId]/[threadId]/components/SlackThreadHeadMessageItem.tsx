import { MessageItem } from '@/apis/messages'
import { SlackThreadMessageItem } from '@/app/archives/[channelId]/[threadId]/components/SlackThreadMessageItem'

interface SlackThreadHeadMessageItemProps {
  message: MessageItem
  messageCount: number
}

export const SlackThreadHeadMessageItem = ({
  message,
  messageCount,
}: SlackThreadHeadMessageItemProps) => {
  return (
    <>
      <SlackThreadMessageItem message={message} variants="thread-head" />
      <div className="flex items-center gap-3 px-4">
        <span className="text-slack-text-opacity700 text-[13px]">{messageCount}개의 댓글</span>
        <div className="bg-slack-stroke-decorative h-[1px] grow" />
      </div>
    </>
  )
}
