import { IconProps } from '@/components/Icons/type'

export const IconCaretDown = ({ className }: IconProps) => {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
      <path
        clipRule="evenodd"
        d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}
