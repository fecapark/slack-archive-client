'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { MdContentCopy, MdOpenInNew } from 'react-icons/md'
import { tv } from 'tailwind-variants'

import { config } from '@/components/config'
import { IconSlack } from '@/components/Icons/IconSlack'
import { Menu } from '@/components/Menu'
import { useToast } from '@/hooks/useToast'
import { getSlackMessagePermalink } from '@/utils/slack'
import { clipboard } from '@toss/utils'

interface SlackMessageMenuProps {
  active?: boolean
  channelId: string
  isFirstItem?: boolean
  messageId?: string
  onOpenChange?: (open: boolean) => void
  threadId: string
}

const menu = tv({
  slots: {
    target:
      'hover:bg-grey200 ease-ease inline-flex cursor-pointer rounded-sm p-2 text-sm transition-colors duration-300',
    content:
      'min-w-[160px] rounded-lg border-none bg-white px-1 py-2 shadow-[shadow:rgba(23,23,28,0.05)_0px_2px_10px,rgba(23,23,28,0.05)_0px_2px_60px]',
    buttonItem:
      'hover:bg-grey100 ease-ease text-text-secondary flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-300',
  },
  variants: {
    active: {
      true: {
        target: 'bg-grey200',
      },
    },
  },
})

export const SlackMessageMenu = ({
  threadId,
  channelId,
  messageId,
  isFirstItem,
  active,
  onOpenChange,
}: SlackMessageMenuProps) => {
  const { target, content, buttonItem } = menu()
  const toast = useToast()
  const isThreadMessage = !!messageId

  return (
    <div
      className={clsx(
        'invisible absolute top-0 right-2 -translate-y-1/2 rounded-sm border border-[rgba(29,28,29,0.13)] bg-white group-hover:visible',
        active && 'visible',
        isFirstItem && '!top-1 !-translate-y-0'
      )}
    >
      <Menu onOpenChange={onOpenChange}>
        <Menu.Target>
          <div className={target({ active })}>
            <IoEllipsisHorizontal />
          </div>
        </Menu.Target>

        <Menu.Content align="end" className={content()} sideOffset={4}>
          <Menu.ButtonItem
            className={buttonItem()}
            onClick={() => {
              const { baseURL } = config
              const queryString = new URLSearchParams({
                t: threadId,
                ...(messageId ? { m: messageId } : {}),
              })
              clipboard.writeText(`${baseURL}/archives/${channelId}/${threadId}?${queryString}`)
              toast.success(`${isThreadMessage ? '메시지' : '스레드'} 링크를 복사했어요.`)
            }}
          >
            <MdContentCopy />
            <div>링크 복사하기</div>
          </Menu.ButtonItem>
          <Menu.ButtonItem className="w-full">
            <Link
              className={buttonItem()}
              href={getSlackMessagePermalink({ channelId, threadId, messageId })}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconSlack className="size-3.5" />
              <div className="flex items-center gap-1">
                슬랙에서 보기
                <MdOpenInNew />
              </div>
            </Link>
          </Menu.ButtonItem>
        </Menu.Content>
      </Menu>
    </div>
  )
}
