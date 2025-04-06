import { trim, trimEnd, trimStart } from 'es-toolkit'

import {
  codeBlockRegex,
  emojiRegex,
  linkWithTextRegex,
  mentionRegex,
  placeholders,
  rawBrElement,
  rawNewLineElement,
  strikeRegex,
} from '@/components/SlackMarkdown/utils/regex'
import { objectKeys } from '@toss/utils'

const replaceABrAfterTag = (text: string, tagname: string) => {
  return text.replace(
    new RegExp(`<${tagname} .*>.*</${tagname}>(${rawBrElement})`, 'g'),
    (match) => {
      return match.replace(new RegExp(`${rawBrElement}$`, 'g'), rawNewLineElement)
    }
  )
}

export const convertMentionString = (text: string) => {
  const wrapMentions = (text: string) => {
    return text.replace(mentionRegex.multiple, (match) => {
      return `<span class="inline-flex items-center gap-1 flex-wrap">${match}</span>`
    })
  }

  return wrapMentions(text).replace(mentionRegex.single, (match) => {
    match = match.replace(/<(@|!)|>/g, '')
    return `<span data-mention="true">@${match}</span>`
  })
}

export const convertNewLineToRawElement = (text: string) => {
  const convert = (t: string) => {
    const unifiedNewLineVariants = t.replace(/\r\n|\r|\n/g, '\n')
    const convertedMultipleNewLines = unifiedNewLineVariants.replace(/\n{2,}/g, (match) => {
      return rawNewLineElement.repeat(match.length - 1)
    })
    return convertedMultipleNewLines.replaceAll('\n', rawBrElement)
  }

  const originCodeBlockText = text.match(codeBlockRegex)
  if (!originCodeBlockText) {
    return convert(text)
  }

  const safeCodeBlockText = text.replace(codeBlockRegex, placeholders.codeBlock)
  const convertedText = convert(safeCodeBlockText)
  const result = convertedText.replace(
    new RegExp(placeholders.codeBlock, 'g'),
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
  return replaceABrAfterTag(res, 'pre')
}

export const decodeCodeBlockContent = (text: string) => {
  const gtltConvertMap = {
    '&gt;': '>',
    '&lt;': '<',
  }

  const decoded = decodeURIComponent(text)

  return objectKeys(gtltConvertMap).reduce((acc, key) => {
    const value = gtltConvertMap[key]
    return acc.replace(new RegExp(key, 'g'), value)
  }, decoded)
}

export const convertLinkString = (text: string) => {
  return text.replace(linkWithTextRegex, (match) => {
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
  const leftString = text
    .replace(emojiRegex, '')
    .replaceAll(rawNewLineElement, '')
    .replaceAll(rawBrElement, '')
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
  return text.replace(strikeRegex, (match) => {
    const resolveNewLine = match
      .replaceAll(rawNewLineElement, '</s><s>')
      .replaceAll(rawBrElement, '</s><s>')
    return `<s>${resolveNewLine.slice(1, -1)}</s>`
  })
}

export const convertBlockquoteString = (text: string) => {
  const generatePlaceholderRegex = (k: keyof typeof placeholders.blockquote) => {
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const escapedPlaceholder = escapeRegex(placeholders.blockquote[k])
    const escapedBr = escapeRegex(rawBrElement)
    const escapedDiv = escapeRegex(rawNewLineElement)
    const allEscapedPlaceholders = objectKeys(placeholders.blockquote)
      .map((key) => escapeRegex(placeholders.blockquote[key].trim()))
      .join('|')

    return new RegExp(
      `(${escapedPlaceholder.trim()}\\s+.*?)(?=${escapedBr}|${escapedDiv}|${allEscapedPlaceholders}|$)`,
      'gm'
    )
  }

  // 반드시 replace하는 순서 고정
  const preConvertedText = text
    .replaceAll(
      new RegExp(`${rawBrElement}(&gt;|>)(&gt;|>) `, 'gm'),
      placeholders.blockquote['br-twice']
    )
    .replaceAll(
      new RegExp(`${rawNewLineElement}(&gt;|>)(&gt;|>) `, 'gm'),
      placeholders.blockquote['div-twice']
    )
    .replaceAll(new RegExp(`${rawBrElement}(&gt;|>) `, 'gm'), placeholders.blockquote['br-once'])
    .replaceAll(
      new RegExp(`${rawNewLineElement}(&gt;|>) `, 'gm'),
      placeholders.blockquote['div-once']
    )
    .replace(/^(&gt;|>)(&gt;|>) /m, placeholders.blockquote['twice'])
    .replace(/^(&gt;|>) /m, placeholders.blockquote['once'])

  const blockquoted = preConvertedText
    .replace(generatePlaceholderRegex('br-twice'), (match) => {
      const content = match.replace(placeholders.blockquote['br-twice'], '')
      return `${rawBrElement}<blockquote data-type="twice">${content}</blockquote>`
    })
    .replace(generatePlaceholderRegex('div-twice'), (match) => {
      const content = match.replaceAll(placeholders.blockquote['div-twice'], '')
      return `${rawNewLineElement}<blockquote data-type="twice">${content}</blockquote>`
    })
    .replace(generatePlaceholderRegex('br-once'), (match) => {
      const content = match.replaceAll(placeholders.blockquote['br-once'], '')
      return `${rawBrElement}<blockquote data-type="once">${content}</blockquote>`
    })
    .replace(generatePlaceholderRegex('div-once'), (match) => {
      const content = match.replaceAll(placeholders.blockquote['div-once'], '')
      return `${rawNewLineElement}<blockquote data-type="once">${content}</blockquote>`
    })
    .replace(generatePlaceholderRegex('once'), (match) => {
      const content = match.replaceAll(placeholders.blockquote['once'], '')
      return `<blockquote data-type="once">${content}</blockquote>`
    })
    .replace(generatePlaceholderRegex('twice'), (match) => {
      const content = match.replaceAll(placeholders.blockquote['twice'], '')
      return `<blockquote data-type="twice">${content}</blockquote>`
    })
    .replace(
      new RegExp(`/blockquote>(${rawBrElement}|${rawNewLineElement})+<blockquote`, 'g'),
      (match) => {
        return match.replaceAll(rawBrElement, '').replaceAll(rawNewLineElement, '')
      }
    )

  return replaceABrAfterTag(blockquoted, 'blockquote')
}
