import { z } from 'zod'

import { api } from '@/apis/api'
import { injectAttachmentKeyInMessage } from '@/apis/messages'
import { ChannelSchema, MessageSchema, ThreadSchema } from '@/types/schema'

export const ThreadResponseSchema = ThreadSchema.extend({
  head: MessageSchema,
  channel: ChannelSchema,
})

export const ThreadListSchema = z.array(ThreadResponseSchema)

export type ThreadItem = z.infer<typeof ThreadResponseSchema>

export const getThreads = async (channelId: string) => {
  const res = await api.get<ThreadItem[]>(`api/${channelId}/threads`).json()
  return ThreadListSchema.parse(
    res.map((thread) => ({
      ...thread,
      head: injectAttachmentKeyInMessage(thread.head),
    }))
  )
}
