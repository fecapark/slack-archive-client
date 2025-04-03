'use client'

import { IoEllipsisHorizontal } from 'react-icons/io5'
import { MdContentCopy } from 'react-icons/md'
import { tv } from 'tailwind-variants'

import { IconSlack } from '@/components/Icons/IconSlack'
import { Menu } from '@/components/Menu'

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

export const SlackMessageMenu = () => {
  const { target, content, buttonItem } = menu()
  return (
    <Menu>
      <Menu.Target>
        <div className={target()}>
          <IoEllipsisHorizontal />
        </div>
      </Menu.Target>

      <Menu.Content align="end" className={content()} sideOffset={4}>
        <Menu.ButtonItem className={buttonItem()}>
          <MdContentCopy />
          <div>링크 복사</div>
        </Menu.ButtonItem>
        <Menu.ButtonItem className={buttonItem()}>
          <IconSlack className="size-3.5" />
          <div>슬랙에서 보기</div>
        </Menu.ButtonItem>
      </Menu.Content>
    </Menu>
  )
}
