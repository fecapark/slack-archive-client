'use client'

import Link from 'next/link'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { MdContentCopy, MdOpenInNew } from 'react-icons/md'
import { tv } from 'tailwind-variants'

import { IconSlack } from '@/components/Icons/IconSlack'
import { Menu } from '@/components/Menu'
import { useToast } from '@/hooks/useToast'
import { getSlackMessagePermalink } from '@/utils/slack'

interface SlackMessageMenuProps {
  channelId: string
  messageId?: string
  threadId: string
}

const menu = tv({
  slots: {
    target:
      'hover:bg-grey200 ease-ease cursor-pointer rounded-sm p-2 text-sm transition-colors duration-300',
    content:
      'min-w-[160px] rounded-lg border-none bg-white px-1 py-2 shadow-[shadow:rgba(23,23,28,0.05)_0px_2px_10px,rgba(23,23,28,0.05)_0px_2px_60px]',
    buttonItem:
      'hover:bg-grey100 ease-ease text-text-secondary flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-300',
  },
})

export const SlackMessageMenu = ({ threadId, channelId, messageId }: SlackMessageMenuProps) => {
  const { target, content, buttonItem } = menu()
  const toast = useToast()
  const isThreadMessage = !!messageId

  return (
    <div className="absolute top-1 right-2">
      <Menu>
        <Menu.Target>
          <div className={target()}>
            <IoEllipsisHorizontal />
          </div>
        </Menu.Target>

        <Menu.Content align="end" className={content()} sideOffset={4}>
          <Menu.ButtonItem
            className={buttonItem()}
            onClick={() =>
              toast.success(`${isThreadMessage ? '메시지' : '스레드'} 링크를 복사했어요.`)
            }
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
