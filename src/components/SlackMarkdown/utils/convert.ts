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

export const convertNewlineDouble = (text: string) => {
  return text.replace(/\n/g, '<br />')
}

export const magicCodeBlockString = '2f039ff4-73cb-44e1-8b70-8873978b8e1f'

export const convertCodeBlockString = (text: string) => {
  return text.replace(/```([^`]+)```/g, (match) => {
    return match.replace(/```/, '```' + magicCodeBlockString).replace('<br />', '\n')
  })
}
