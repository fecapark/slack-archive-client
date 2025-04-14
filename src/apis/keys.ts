export const getMessagesQueryKey = (threadId: string) => {
  return ['messages', threadId]
}

export const getThreadsQueryKey = (channelId: string) => {
  return ['threads', channelId]
}
