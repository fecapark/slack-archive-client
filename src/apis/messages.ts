import { z } from 'zod'

export const MessageSchema = z.object({
  ts: z.string(),
  threadTs: z.string(),
  channel: z.string(),
  edited: z.boolean(),
  text: z.string(),
  user: z.object({
    id: z.string(),
    isBot: z.boolean(),
    name: z.string(),
    avatar: z.string(),
  }),
  files: z
    .array(
      z.object({
        created: z.number(),
        filetype: z.string(),
        height: z.string().optional(),
        id: z.string(),
        mimetype: z.string(),
        name: z.string(),
        size: z.number(),
        width: z.string().optional(),
      })
    )
    .nullable(),
  reactions: z
    .array(
      z.object({
        name: z.string(),
        users: z.array(z.string()),
        count: z.number(),
      })
    )
    .nullable(),
})

export type MessageItem = z.infer<typeof MessageSchema>
