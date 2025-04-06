import { z } from 'zod'

/* 
  Todo: Resolving nullish transforms as undefined in backend
*/

export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
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
  height: z
    .number()
    .nullish()
    .transform((v) => v ?? undefined),
  id: z.string(),
  mimetype: z.string(),
  name: z.string(),
  size: z.number(),
  width: z
    .number()
    .nullish()
    .transform((v) => v ?? undefined),
})

export type MessageFileItem = z.infer<typeof MessageFileSchema>

export const MessageReactionSchema = z.object({
  name: z.string(),
  users: z.array(z.string()),
  count: z.number(),
  url: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
})

export type MessageReactionItem = z.infer<typeof MessageReactionSchema>

export const MessageUserSchema = z.object({
  id: z.string(),
  isBot: z.boolean(),
  name: z.string(),
  avatar: z.string(),
})

export const MessageLinkAttachmentSchema = z.object({
  fromUrl: z.string(),
  imageHeight: z
    .number()
    .nullish()
    .transform((v) => v ?? undefined),
  imageUrl: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  imageWidth: z
    .number()
    .nullish()
    .transform((v) => v ?? undefined),
  serviceIcon: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  serviceName: z.string(),
  text: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  title: z.string(),
  titleLink: z.string(),
  type: z.literal('link'),
  url: z.string(),
  id: z.string(),
})

export type MessageLinkAttachmentItem = z.infer<typeof MessageLinkAttachmentSchema>

export const MessageYoutubeAttachmentSchema = z.object({
  authorLink: z.string(),
  authorName: z.string(),
  serviceIcon: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  serviceName: z.string(),
  serviceUrl: z.string(),
  text: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  thumbHeight: z.number(),
  thumbUrl: z.string(),
  thumbWidth: z.number(),
  title: z.string(),
  titleLink: z.string(),
  type: z.literal('youtube'),
  url: z.string(),
  videoHTML: z.string(),
  videoHTMLHeight: z.number(),
  videoHTMLWidth: z.number(),
  id: z.string(),
})

export type MessageYoutubeAttachmentItem = z.infer<typeof MessageYoutubeAttachmentSchema>

export const MessageSlackAttachmentSchema = z.object({
  authorIcon: z.string(),
  authorLink: z.string(),
  authorName: z.string(),
  footer: z.string(),
  text: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  type: z.literal('slack'),
  url: z.string(),
  ts: z.string(),
  id: z.string(),
})

export type MessageSlackAttachmentItem = z.infer<typeof MessageSlackAttachmentSchema>

export type MessageAttachmentItem =
  | MessageLinkAttachmentItem
  | MessageSlackAttachmentItem
  | MessageYoutubeAttachmentItem

export const MessageSchema = z.object({
  ts: z.string(),
  threadTs: z.string(),
  channel: z.string(),
  edited: z.boolean(),
  text: z.string(),
  user: MessageUserSchema,
  files: z
    .array(MessageFileSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  reactions: z
    .array(MessageReactionSchema)
    .nullish()
    .transform((v) => v ?? undefined),
  attachments: z
    .array(
      z.union([
        MessageLinkAttachmentSchema,
        MessageYoutubeAttachmentSchema,
        MessageSlackAttachmentSchema,
      ])
    )
    .nullish()
    .transform((v) => v ?? undefined),
})
