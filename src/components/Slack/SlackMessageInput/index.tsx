import { IconAdd } from '@/components/Slack/SlackMessageInput/Icons/IconAdd'
import { IconCaretDown } from '@/components/Slack/SlackMessageInput/Icons/IconCaretDown'
import { IconEllipsisHorizontal } from '@/components/Slack/SlackMessageInput/Icons/IconEllipsisHorizontal'
import { IconEmoji } from '@/components/Slack/SlackMessageInput/Icons/IconEmoji'
import { IconFormatting } from '@/components/Slack/SlackMessageInput/Icons/IconFormatting'
import { IconSendFilled } from '@/components/Slack/SlackMessageInput/Icons/IconSendFilled'
import { IconWrapper } from '@/components/Slack/SlackMessageInput/IconWrapper'

export const SlackMessageInput = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="w-full rounded-lg border border-[rgba(29,28,29,0.3)]">
      <div className="px-3 py-2">{children}</div>
      <div className="flex h-[40px] items-center justify-between pr-1 pl-1.5">
        <div className="flex items-center">
          <IconWrapper containerClassName="bg-[rgba(29,28,29,0.06)] rounded-full">
            <IconAdd />
          </IconWrapper>
          <IconWrapper>
            <IconFormatting />
          </IconWrapper>
          <IconWrapper>
            <IconEmoji />
          </IconWrapper>
          <IconWrapper>
            <IconEllipsisHorizontal />
          </IconWrapper>
        </div>
        <div className="flex h-7 items-center rounded-sm bg-[#007a5a] py-0.5">
          <div className="flex h-full items-center border-r border-white px-2">
            <IconSendFilled className="size-4 text-white" />
          </div>
          <div className="flex h-full items-center px-2 py-0.5">
            <IconCaretDown className="size-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
