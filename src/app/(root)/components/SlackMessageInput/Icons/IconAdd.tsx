import { IconProps } from '@/app/(root)/components/SlackMessageInput/Icons/type'

export const IconAdd = ({ className }: IconProps) => {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
      <path
        clipRule="evenodd"
        d="M10.75 3.25a.75.75 0 0 0-1.5 0v6H3.251L3.25 10v-.75a.75.75 0 0 0 0 1.5V10v.75h6v6a.75.75 0 0 0 1.5 0v-6h6a.75.75 0 0 0 0-1.5h-6z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}
