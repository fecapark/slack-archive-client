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
