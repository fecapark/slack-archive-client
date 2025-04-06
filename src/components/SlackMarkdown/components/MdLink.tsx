import { HoverTooltip } from '@/components/HoverTooltip'

export const MdLink = ({ children, href }: React.PropsWithChildren<{ href: string }>) => {
  return (
    <HoverTooltip content={href}>
      <a
        className="break-all text-[rgb(18,100,163)] hover:underline"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    </HoverTooltip>
  )
}
