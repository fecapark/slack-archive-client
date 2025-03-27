import { z } from 'zod'

import { api } from '@/apis/api'
import { ChannelSchema } from '@/types/schema'

export const ChannelListSchema = z.array(ChannelSchema)

export type ChannelItem = z.infer<typeof ChannelSchema>

export const getChannels = async () => {
  const res = await api.get<ChannelItem[]>('api/channels').json()
  return ChannelListSchema.parse(res)
}

export const getChannel = async (channelId: string) => {
  const res = await api.get<ChannelItem>(`api/channel/${channelId}`).json()
  return ChannelSchema.parse(res)
}
