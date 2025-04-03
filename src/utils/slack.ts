interface GetSlackMessagePermalinkProps {
  channelId: string
  messageId?: string
  threadId: string
}

export const getSlackMessagePermalink = ({
  channelId,
  threadId,
  messageId,
}: GetSlackMessagePermalinkProps) => {
  const query = new URLSearchParams({
    cid: channelId,
    thread_ts: threadId,
  }).toString()

  if (messageId) {
    return `https://slack.com/archives/${channelId}/p${messageId.replace('.', '')}?${query}`
  }
  return `https://slack.com/archives/${channelId}/p${threadId.replace('.', '')}`
}
