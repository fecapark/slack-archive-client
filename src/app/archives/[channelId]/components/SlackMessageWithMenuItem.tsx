'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { SlackMessageMenu } from '@/app/archives/[channelId]/components/SlackMessageMenu'

interface SlackMessageWithMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  channelId: string
  isFirstItem?: boolean
  messageId?: string
  threadId: string
}

export const SlackMessageWithMenuItem = ({
  children,
  channelId,
  threadId,
  isFirstItem,
  className,
  messageId,
  ...props
}: React.PropsWithChildren<SlackMessageWithMenuItemProps>) => {
  const [itemActive, setItemActive] = useState(false)

  return (
    <div
      className={clsx(
        'hover:bg-grey100 ease-ease group relative rounded-md px-4 py-3 transition-colors duration-300',
        itemActive && 'bg-grey100',
        className
      )}
      {...props}
    >
      {children}
      <SlackMessageMenu
        active={itemActive}
        channelId={channelId}
        isFirstItem={isFirstItem}
        messageId={messageId}
        onOpenChange={setItemActive}
        threadId={threadId}
      />
    </div>
  )
}
