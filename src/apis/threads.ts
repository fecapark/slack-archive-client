import { z } from 'zod'

import { api } from '@/apis/api'
import { ChannelSchema } from '@/apis/channels'
import { MessageSchema } from '@/apis/messages'

export const ThreadSchema = z.object({
  ts: z.string(),
  archivedAt: z.string(),
  channel: ChannelSchema,
  head: MessageSchema,
})

export const ThreadListSchema = z.array(ThreadSchema)

export type ThreadItem = z.infer<typeof ThreadSchema>

export const getThreads = async (channelId: string) => {
  const res = await api.get(`api/${channelId}/threads`).json()
  return ThreadListSchema.parse(res)
}
