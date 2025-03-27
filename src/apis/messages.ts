import { z } from 'zod'

import { api } from '@/apis/api'
import { ChannelSchema, MessageSchema, ThreadSchema } from '@/types/schema'

export const MessageResponseSchema = MessageSchema.extend({
  thread: ThreadSchema,
  channel: ChannelSchema,
})

export const MessageListSchema = z.array(MessageResponseSchema)

export type MessageItem = z.infer<typeof MessageResponseSchema>

export const getMessages = async (threadId: string) => {
  const res = await api.get<MessageItem[]>(`api/${threadId}/messages`).json()
  return res
}
