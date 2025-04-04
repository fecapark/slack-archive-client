import { trimEnd, trimStart } from 'es-toolkit'

import { codeBlockRegex, linkWithTextRegex } from '@/components/SlackMarkdown/utils/regex'

export const useAllLinksInText = (text: string) => {
  const links = text.replace(codeBlockRegex, '').match(linkWithTextRegex)

  if (!links) {
    return []
  }

  return links
    .map((link) => {
      const [rawUrl, rawText] = link.split('|')
      const url = trimStart(rawUrl ?? '', '<')
      if (!trimEnd(rawText ?? '', '>')) {
        return trimEnd(url, '>').trim()
      }
      return url.trim()
    })
    .filter((link) => !link.startsWith('https://yourssu.slack.com'))
}
