'use client'

import { compareDesc } from 'date-fns'
import { useEffect } from 'react'

import { getChannels } from '@/apis/channels'
import { getChannelsQueryKey, getMessagesQueryKey, getThreadsQueryKey } from '@/apis/keys'
import { getMessages } from '@/apis/messages'
import { getThreads } from '@/apis/threads'
import { assertNonNullish } from '@/utils/assertion'
import { getQueryClient } from '@/utils/query'
import { useSuspenseQueries } from '@tanstack/react-query'

export const useThreadsQuery = (channelId: string) => {
  const [{ data: channels }, { data: threads }] = useSuspenseQueries({
    queries: [
      {
        queryKey: getChannelsQueryKey(),
        queryFn: async () => getChannels(),
      },
      {
        queryKey: getThreadsQueryKey(channelId),
        queryFn: async () => getThreads(channelId),
      },
    ],
  })

  const channel = channels.find((channel) => channel.id === channelId)
  assertNonNullish(channel, '채널 값이 비어있어요.')

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

  return {
    channel,
    threads: [...threads].sort((a, b) => compareDesc(a.archivedAt, b.archivedAt)),
  }
}
