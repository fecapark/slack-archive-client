'use client'

import { useEffect } from 'react'

import { ChannelItem } from '@/apis/channels'
import { getMessagesQueryKey, getThreadsQueryKey } from '@/apis/keys'
import { getMessages } from '@/apis/messages'
import { getThreads } from '@/apis/threads'
import { SlackThreadLinkItem } from '@/app/archives/[channelId]/components/SlackThreadLinkItem'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelIcon } from '@/app/archives/components/Icons/SidebarChannelIcon'
import { getQueryClient } from '@/utils/query'
import { useSuspenseQuery } from '@tanstack/react-query'

interface ChannelPanelProps {
  channel: ChannelItem
}

export const ChannelPanel = ({ channel }: ChannelPanelProps) => {
  const { data: threads } = useSuspenseQuery({
    queryKey: getThreadsQueryKey(channel.id),
    queryFn: async () => getThreads(channel.id),
  })

  useEffect(() => {
    const prefetchMessages = async () => {
      const queryClient = getQueryClient()
      await Promise.all(
        threads.map((thread) =>
          queryClient.prefetchQuery({
            queryKey: getMessagesQueryKey(thread.head.ts),
            queryFn: () => getMessages(thread.head.ts),
          })
        )
      )
    }
    prefetchMessages()
  }, [threads])

  return (
    <ArchivePannel
      className="absolute z-[1] w-full md:static"
      closeLink="/archives"
      description={channel.description}
      title={
        <div className="flex items-center">
          <SidebarChannelIcon className="mr-1 size-4" /> {channel.name}
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
