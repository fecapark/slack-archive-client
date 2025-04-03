import { z } from 'zod'

export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
})

export const ThreadMetadataSchema = z.object({
  messagesAmount: z.number(),
  userAvatars: z.array(z.string()),
})

export type ThreadMetadataItem = z.infer<typeof ThreadMetadataSchema>

export const ThreadSchema = z.object({
  ts: z.string(),
  archivedAt: z.string(),
  metadata: ThreadMetadataSchema,
})

export const MessageFileSchema = z.object({
  created: z.number(),
  filetype: z.string(),
  height: z.number().optional(),
  id: z.string(),
  mimetype: z.string(),
  name: z.string(),
  size: z.number(),
  width: z.number().optional(),
})

export type MessageFileItem = z.infer<typeof MessageFileSchema>

export const MessageReactionSchema = z.object({
  name: z.string(),
  users: z.array(z.string()),
  count: z.number(),
  url: z.string().optional(),
})

export type MessageReactionItem = z.infer<typeof MessageReactionSchema>

export const MessageUserSchema = z.object({
  id: z.string(),
  isBot: z.boolean(),
  name: z.string(),
  avatar: z.string(),
})

export const MessageSchema = z.object({
  ts: z.string(),
  threadTs: z.string(),
  channel: z.string(),
  edited: z.boolean(),
  text: z.string(),
  user: MessageUserSchema,
  files: z.array(MessageFileSchema).nullable(),
  reactions: z.array(MessageReactionSchema).nullable(),
})
