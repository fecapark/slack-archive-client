import { v4 } from 'uuid'
import { z } from 'zod'

import { api } from '@/apis/api'
import { ChannelSchema, MessageAttachmentItem, MessageSchema, ThreadSchema } from '@/types/schema'

export const MessageResponseSchema = MessageSchema.extend({
  thread: ThreadSchema,
  channel: ChannelSchema,
})

export const MessageListSchema = z.array(MessageResponseSchema)

export type MessageItem = z.infer<typeof MessageResponseSchema>

/* 
  Todo: 백엔드가 unique key를 생성하도록 변경해야해요.
*/
export const injectAttachmentKeyInMessage = (
  message: Omit<z.infer<typeof MessageSchema>, 'channel'>
) => {
  const injectUniqueAttachmentKey = (attachment: MessageAttachmentItem) => {
    return {
      ...attachment,
      id: `${attachment.url}-${v4()}`,
    }
  }

  return {
    ...message,
    attachments: message.attachments && message.attachments.map(injectUniqueAttachmentKey),
  }
}

export const getMessages = async (threadId: string) => {
  const res = await api.get<MessageItem[]>(`api/${threadId}/messages`).json()
  return MessageListSchema.parse(res.map(injectAttachmentKeyInMessage))
}
