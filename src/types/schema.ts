import { z } from 'zod'

export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
})

export const ThreadSchema = z.object({
  ts: z.string(),
  archivedAt: z.string(),
})

export const MessageFileSchema = z.object({
  created: z.number(),
  filetype: z.string(),
  height: z.string().optional(),
  id: z.string(),
  mimetype: z.string(),
  name: z.string(),
  size: z.number(),
  width: z.string().optional(),
})

export const MessageReactionSchema = z.object({
  name: z.string(),
  users: z.array(z.string()),
  count: z.number(),
})

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
