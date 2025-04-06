export const codeBlockRegex = /```[^`]*(?:`(?!``)[^`]*)*```/g

export const linkWithTextRegex = /<(http[^>]+)>/g

export const emojiRegex = /:https:\/\/[^|]+\|((:[^:]+:(?::skin-tone-\d+:)?)):/g

export const strikeRegex = /~([^~]+)~/g

export const mentionRegex = {
  single: /<(@|!)[^>]+>/g,
  multiple: /(<(@|!)[^>]+>\s*)+/g,
}

export const rawNewLineElement = String.raw`<div className="h-2" />`

export const rawBrElement = String.raw`<br />`

export const placeholders = {
  codeBlock:
    '_____f1ae2436-495c-4cde-9396-cdca8965b295_CODEBLOCK_f1ae2436-495c-4cde-9396-cdca8965b295____',
  blockquote: {
    'br-once':
      '_____f1ae2436-495c-4cde-9396-cdca8965b295_BLOCKQUOTE-BR-ONCE_f1ae2436-495c-4cde-9396-cdca8965b295____ ',
    'br-twice':
      '_____f1ae2436-495c-4cde-9396-cdca8965b295_BLOCKQUOTE-BR-TWICE_f1ae2436-495c-4cde-9396-cdca8965b295____ ',
    'div-once':
      '_____f1ae2436-495c-4cde-9396-cdca8965b295_BLOCKQUOTE-DIV-ONCE_f1ae2436-495c-4cde-9396-cdca8965b295____ ',
    'div-twice':
      '_____f1ae2436-495c-4cde-9396-cdca8965b295_BLOCKQUOTE-DIV-TWICE_f1ae2436-495c-4cde-9396-cdca8965b295____ ',
    once: '_____f1ae2436-495c-4cde-9396-cdca8965b295_BLOCKQUOTE-ONCE_f1ae2436-495c-4cde-9396-cdca8965b295____ ',
    twice:
      '_____f1ae2436-495c-4cde-9396-cdca8965b295_BLOCKQUOTE-TWICE_f1ae2436-495c-4cde-9396-cdca8965b295____ ',
  },
}
