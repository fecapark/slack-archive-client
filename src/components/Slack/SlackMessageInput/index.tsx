import { IconAdd } from '@/components/Icons/IconAdd'
import { IconCaretDown } from '@/components/Icons/IconCaretDown'
import { IconEllipsisHorizontal } from '@/components/Icons/IconEllipsisHorizontal'
import { IconEmoji } from '@/components/Icons/IconEmoji'
import { IconFormatting } from '@/components/Icons/IconFormatting'
import { IconSendFilled } from '@/components/Icons/IconSendFilled'
import { IconWrapper } from '@/components/Slack/SlackMessageInput/IconWrapper'
import { SlackMessageInputCommandOverlay } from '@/components/Slack/SlackMessageInputCommandOverlay'

interface SlackMessageInputProps {
  commands?: {
    description: string
    name: string
    selected?: boolean
  }[]
}

export const SlackMessageInput = ({
  children,
  commands = [],
}: React.PropsWithChildren<SlackMessageInputProps>) => {
  return (
    <div
      className="w-full"
      style={{
        paddingTop: commands.length * 60,
      }}
    >
      <div className="border-slack-stroke-decorative relative w-full rounded-lg border">
        {!!commands.length && (
          <SlackMessageInputCommandOverlay>
            {commands.map((props) => (
              <SlackMessageInputCommandOverlay.Item key={props.name} {...props} />
            ))}
          </SlackMessageInputCommandOverlay>
        )}
        <div className="px-3 py-2">{children}</div>
        <div className="flex h-[40px] items-center justify-between pr-1 pl-1.5">
          <div className="flex items-center">
            <IconWrapper containerClassName="bg-slack-button-default rounded-full">
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
          <div className="bg-slack-submit-primary flex h-7 items-center rounded-sm py-0.5">
            <div className="flex h-full items-center border-r border-white px-2">
              <IconSendFilled className="size-4 text-white" />
            </div>
            <div className="flex h-full items-center px-2 py-0.5">
              <IconCaretDown className="size-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
