import Link from 'next/link'

import { SlackMarkdown } from '@/components/SlackMarkdown'

interface AttachmentHeaderProps {
  imageUrl: string
}

interface AttachmentTitleLinkProps {
  href: string
}

type AttachmentTextProps =
  | React.PropsWithChildren<{
      markdown?: false
    }>
  | {
      children: string
      markdown: true
    }

const AttachmentHeader = ({
  children,
  imageUrl,
}: React.PropsWithChildren<AttachmentHeaderProps>) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 mb-[3px] size-4">
        {/* 이미지 호스트의 URL을 예측할 수 없기 때문에 HTML img 태그로 변경해요. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="favicon" className="size-full object-contain" src={imageUrl} />
      </div>
      <div className="font-bold">{children}</div>
    </div>
  )
}

const AttachmentTitleLink = ({
  href,
  children,
}: React.PropsWithChildren<AttachmentTitleLinkProps>) => {
  return (
    <div>
      <Link
        className="font-bold text-[rgb(18,100,163)] hover:underline"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </Link>
    </div>
  )
}

const AttachmentText = ({ markdown, children }: AttachmentTextProps) => {
  return <div>{markdown ? <SlackMarkdown>{children}</SlackMarkdown> : children}</div>
}

export const SlackMessageAttachmentLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="mb-2 flex max-w-[600px]">
      <div className="w-1 shrink-0 rounded-md bg-[rgb(221,221,221)]" />
      <div className="px-3 text-[15px]">{children}</div>
    </div>
  )
}

SlackMessageAttachmentLayout.Header = AttachmentHeader
SlackMessageAttachmentLayout.TitleLink = AttachmentTitleLink
SlackMessageAttachmentLayout.Text = AttachmentText
