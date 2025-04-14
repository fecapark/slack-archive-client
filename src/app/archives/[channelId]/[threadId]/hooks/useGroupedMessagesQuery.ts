'use client'

import { differenceInMinutes } from 'date-fns'

import { getMessagesQueryKey } from '@/apis/keys'
import { getMessages } from '@/apis/messages'
import { MessageItem } from '@/apis/messages'
import { convertSlackTimestampToISOString } from '@/utils/date'
import { useSuspenseQuery } from '@tanstack/react-query'

const groupMessagesWithSameUser = (messages: MessageItem[]): MessageItem[][] => {
  if (messages.length === 0) return []

  const result: MessageItem[][] = []
  let currentGroup: MessageItem[] = [messages[0]]

  for (let i = 1; i < messages.length; i++) {
    const currentMessage = messages[i]
    const previousMessage = messages[i - 1]

    const sameAuthor = currentMessage.user.id === previousMessage.user.id
    const diffMinutes = Math.abs(
      differenceInMinutes(
        convertSlackTimestampToISOString(currentMessage.ts),
        convertSlackTimestampToISOString(previousMessage.ts)
      )
    )

    if (sameAuthor && diffMinutes <= 15) {
      currentGroup.push(currentMessage)
    } else {
      result.push(currentGroup)
      currentGroup = [currentMessage]
    }
  }

  if (currentGroup.length > 0) {
    result.push(currentGroup)
  }

  return result
}

export const useGroupedMessagesQuery = (threadId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: getMessagesQueryKey(threadId),
    queryFn: () => getMessages(threadId),
  })

  const [headMessage, ...messages] = data

  return {
    headMessage,
    groupedMessages: groupMessagesWithSameUser(messages),
    messagesCount: messages.length,
  }
}
