'use client'

import { SlackThreadLinkItem } from '@/app/archives/[channelId]/components/SlackThreadLinkItem'
import { useThreadsQuery } from '@/app/archives/[channelId]/hooks/useThreadsQuery'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { IconSidebarChannel } from '@/components/Icons/IconSidebarChannel'

interface ChannelPanelProps {
  channelId: string
}

export const ChannelPanel = ({ channelId }: ChannelPanelProps) => {
  const { channel, threads } = useThreadsQuery(channelId)

  return (
    <ArchivePannel
      className="absolute z-[1] w-full md:static"
      closeLink="/archives"
      description={channel.description}
      title={
        <div className="flex items-center">
          <IconSidebarChannel className="mr-1 size-4" /> {channel.name}
        </div>
      }
    >
      <div className="flex h-0 grow flex-col overflow-y-auto">
        {threads.map(({ head, archivedAt, metadata }, index) => (
          <SlackThreadLinkItem
            archivedAt={archivedAt}
            head={head}
            isFirstItem={index === 0}
            key={head.ts}
            metadata={metadata}
          />
        ))}
      </div>
    </ArchivePannel>
  )
}
