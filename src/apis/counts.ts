import { z } from 'zod'

import { api } from '@/apis/api'

const ArchiveCountsSchema = z.object({
  channels: z.number(),
  threads: z.number(),
  messages: z.number(),
})

export type ArchiveCounts = z.infer<typeof ArchiveCountsSchema>

export const getArchiveCounts = async () => {
  const res = await api.get<ArchiveCounts>(`api/counts`).json()
  return ArchiveCountsSchema.parse(res)
}
