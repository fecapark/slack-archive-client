import { HoverTooltip } from '@/components/HoverTooltip'

export const MdLink = ({ children, href }: React.PropsWithChildren<{ href: string }>) => {
  return (
    <HoverTooltip content={href}>
      <a
        className="text-slack-text-link break-all hover:underline"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    </HoverTooltip>
  )
}
