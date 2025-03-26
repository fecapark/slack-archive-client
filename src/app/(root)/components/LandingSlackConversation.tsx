import Link, { LinkProps } from 'next/link'

interface LandingSlackConversationHeadProps {
  description: string
  title: React.ReactNode
}

const Head = ({ title, description }: LandingSlackConversationHeadProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <h4 className="text-base font-semibold text-gray-500">{description}</h4>
    </div>
  )
}

const Slack = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full flex-col justify-between gap-4 select-none">{children}</div>
}

const LinkButton = ({ children, ...props }: React.PropsWithChildren<LinkProps>) => {
  return (
    <Link
      {...props}
      className="bg-grey900 flex items-center gap-1 rounded-[10px] px-4 py-2.5 font-semibold text-white"
    >
      {children}
    </Link>
  )
}

export const LandingSlackConversation = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex w-full flex-col items-center gap-12">{children}</div>
}

LandingSlackConversation.Head = Head
LandingSlackConversation.Slack = Slack
LandingSlackConversation.LinkButton = LinkButton
