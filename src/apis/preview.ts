import ky from 'ky'
import { getLinkPreview } from 'link-preview-js'
import { z } from 'zod'

import { config } from '@/components/config'

type LinkPreviewResponse = Extract<Awaited<ReturnType<typeof getLinkPreview>>, { title: string }>

const LinkPreviewSchema = z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  favicons: z.array(z.string()),
  siteName: z.string(),
})

export const requestLinkPreview = async (url: string) => {
  const searchParams = { url }

  const res = await ky
    .get<LinkPreviewResponse>(`${config.baseURL}/api/preview`, {
      searchParams,
    })
    .json()

  if (!res.siteName) {
    res.siteName = new URL(url).origin
      .split('.')
      .slice(-2)
      .join('.')
      .replace('http://', '')
      .replace('https://', '')
  }

  return LinkPreviewSchema.parse(res)
}
