export const codeBlockRegex = /```[^`]*(?:`(?!``)[^`]*)*```/g

export const linkWithTextRegex = /<(http[^>]+)>/g

export const emojiRegex = /:https:\/\/[^|]+\|((:[^:]+:(?::skin-tone-\d+:)?)):/g

export const strikeRegex = /~([^~]+)~/g

export const mentionRegex = {
  single: /<(@|!)[^>]+>/g,
  multiple: /(<(@|!)[^>]+>\s*)+/g,
}
