import { IconAdd } from '@/app/(root)/components/SlackMessageInput/Icons/IconAdd'
import { IconCaretDown } from '@/app/(root)/components/SlackMessageInput/Icons/IconCaretDown'
import { IconEllipsisHorizontal } from '@/app/(root)/components/SlackMessageInput/Icons/IconEllipsisHorizontal'
import { IconEmoji } from '@/app/(root)/components/SlackMessageInput/Icons/IconEmoji'
import { IconFormatting } from '@/app/(root)/components/SlackMessageInput/Icons/IconFormatting'
import { IconSendFilled } from '@/app/(root)/components/SlackMessageInput/Icons/IconSendFilled'
import { IconWrapper } from '@/app/(root)/components/SlackMessageInput/IconWrapper'

export const SlackMessageInput = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="w-full max-w-[380px] rounded-lg border border-[rgba(29,28,29,0.3)]">
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
