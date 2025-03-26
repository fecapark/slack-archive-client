import { IconProps } from '@/components/Slack/SlackMessageInput/Icons/type'

export const IconEllipsisHorizontal = ({ className }: IconProps) => {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
      <path
        d="M14.5 10a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-6.25 0a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0M2 10a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 10"
        fill="currentColor"
      />
    </svg>
  )
}
