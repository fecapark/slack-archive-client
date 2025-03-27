import Link from 'next/link'

import { ChannelItem } from '@/apis/channels'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'

interface ChannelItemProps {
  channel: ChannelItem
}

export const SidebarChannelItem = ({ channel }: ChannelItemProps) => {
  return (
    <Link
      className="hover:bg-grey100 group text-text-secondary flex cursor-pointer items-center gap-2 rounded-sm p-2"
      href={`/archives/${channel.id}`}
      key={channel.id}
    >
      <SidebarChannelIcon className="group-hover:text-text-primary size-4" />
      <div className="group-hover:text-text-primary text-sm font-medium">{channel.name}</div>
    </Link>
  )
}
