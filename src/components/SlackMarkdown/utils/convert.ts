import { trim, trimEnd, trimStart } from 'es-toolkit'

import { objectKeys } from '@toss/utils'

export const convertMentionString = (text: string) => {
  const wrapMentions = (text: string) => {
    return text.replace(/(<@[^>]+>\s*)+/g, (match) => {
      return `<span class="inline-flex items-center gap-1 flex-wrap">${match}</span>`
    })
  }

  return wrapMentions(text).replace(/<@[^>]+>/g, (match) => {
    match = match.replace(/<@|>/g, '')
    return `<span data-mention="true">@${match}</span>`
  })
}

const codeBlockRegex = /```[^`]*(?:`(?!``)[^`]*)*```/g
const codeBlockPlaceholder =
  '_____f1ae2436-495c-4cde-9396-cdca8965b295_CODEBLOCK_f1ae2436-495c-4cde-9396-cdca8965b295____'
const rawNewLineElement = String.raw`<div className="h-2" />`

export const convertNewLineToRawElement = (text: string) => {
  const convert = (t: string) => {
    const unifiedNewLineVariants = t.replace(/\r\n|\r|\n/g, '\n')
    const convertedOnlyOneNewLine = unifiedNewLineVariants.replace(/(?<!\n)\n(?!\n)/g, '<br />')
    return convertedOnlyOneNewLine.replace(/\n{2,}/g, (match) => {
      return rawNewLineElement.repeat(match.length - 1)
    })
  }

  const originCodeBlockText = text.match(codeBlockRegex)
  if (!originCodeBlockText) {
    return convert(text)
  }

  const safeCodeBlockText = text.replace(codeBlockRegex, codeBlockPlaceholder)
  const convertedText = convert(safeCodeBlockText)
  const result = convertedText.replace(
    new RegExp(codeBlockPlaceholder, 'g'),
    originCodeBlockText[0]
  )
  return result
}

export const convertCodeBlockString = (text: string) => {
  const res = text.replace(codeBlockRegex, (match) => {
    const codeBlockContent = match.replace(/```/g, '')
    /* 
      코드블럭의 콘텐츠에 백틱이 들어있는 경우 ReactMarkdown이 pre 태그를 감지하지 못해요. 
      따라서 특수문자를 인코딩해서 pre 태그에 넣어주고, 실제 렌더링시 디코딩해서 정상적인 콘텐츠를 보여줘요.

      디코딩시에는 반드시 decodeCodeBlockContent를 사용해야 해주세요.
      decodeURIComponent가 대응하지 못하는 케이스들에도 대응하도록 해요.
    */
    return `<pre data-content="${encodeURIComponent(codeBlockContent)}" data-codeblock="true"></pre>`
  })
  return res
}

export const decodeCodeBlockContent = (text: string) => {
  const convertMap = {
    '&gt;': '>',
    '&lt;': '<',
  }

  const decoded = decodeURIComponent(text)

  return objectKeys(convertMap).reduce((acc, key) => {
    const value = convertMap[key]
    return acc.replace(new RegExp(key, 'g'), value)
  }, decoded)
}

export const convertLinkString = (text: string) => {
  return text.replace(/<(http[^>]+)>/g, (match) => {
    const [rawUrl, rawText] = match.split('|')

    let url = trimStart(rawUrl ?? '', '<')
    let text = trimEnd(rawText ?? '', '>')
    if (!text) {
      url = trimEnd(url, '>')
      text = url
    }

    return `<a href="${url}">${text}</a>`
  })
}

export const convertInlineEmojiString = (text: string) => {
  const emojiRegex = /:https:\/\/[^|]+\|((:[^:]+:(?::skin-tone-\d+:)?)):/g

  const leftString = text.replace(emojiRegex, '').replace(rawNewLineElement, '')
  const isOnlyEmojis = leftString.trim().length === 0

  return text.replace(emojiRegex, (match) => {
    if (!match.includes('|')) {
      return match
    }

    const [rawUrl, rawName] = match.split('|')

    let url = trimStart(rawUrl ?? '', ':')
    let name = trim(rawName ?? '', ':')
    if (!name) {
      url = trimEnd(url, ':')
      name = url
    }

    return `<span data-emoji-url="${url}" data-emoji-name="${name}" data-emoji-size="${isOnlyEmojis ? 'large' : 'medium'}"></span>`
  })
}

export const convertStrikeString = (text: string) => {
  return text.replace(/~([^~]+)~/g, (match) => {
    const resolveNewLine = match.replace(rawNewLineElement, '</s><s>')
    return `<s>${resolveNewLine.slice(1, -1)}</s>`
  })
}
