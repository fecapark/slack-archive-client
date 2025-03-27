'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

import { ChannelItem } from '@/apis/channels'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'

interface ChannelItemProps {
  channel: ChannelItem
}

const channelItem = tv({
  slots: {
    link: 'hover:bg-grey100 group text-text-secondary flex cursor-pointer items-center gap-2 rounded-sm p-2',
    icon: 'group-hover:text-text-primary size-4',
    text: 'group-hover:text-text-primary text-sm font-medium',
  },
  variants: {
    active: {
      true: {
        link: 'bg-grey100 text-text-primary',
        text: 'font-bold',
      },
    },
  },
})

export const SidebarChannelItem = ({ channel }: ChannelItemProps) => {
  const pathname = usePathname()
  const isItemActive = pathname.includes(channel.id)

  const { icon, link, text } = channelItem({ active: isItemActive })

  return (
    <Link className={link()} href={`/archives/${channel.id}`} key={channel.id}>
      <SidebarChannelIcon className={icon()} />
      <div className={text()}>{channel.name}</div>
    </Link>
  )
}
