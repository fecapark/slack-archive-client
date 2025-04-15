'use client'

import Image from 'next/image'

import { HoverTooltip } from '@/components/HoverTooltip'
import { ReactionTooltipContent } from '@/components/Slack/SlackMessageItem/components/ReactionTooltipContent'
import { MessageReactionItem } from '@/types/schema'

interface SlackMessageReactionListProps {
  reactions: MessageReactionItem[]
}

export const SlackMessageReactionList = ({ reactions }: SlackMessageReactionListProps) => {
  const mergedReactions = (() => {
    const reactionMap: Record<string, MessageReactionItem[]> = {}

    reactions.forEach((reaction) => {
      if (!reaction.url) {
        return
      }

      const key = reaction.name.replace(/::skin-tone-\d+/g, '')

      if (reactionMap[key]) {
        reactionMap[key].push(reaction)
      } else {
        reactionMap[key] = [reaction]
      }
    })

    return [...Object.values(reactionMap)]
  })()

  const getReactionGroupTotalCount = (reactionGroup: MessageReactionItem[]) => {
    return reactionGroup.reduce(
      (total, reaction) => total + (!!reaction.url ? reaction.count : 0),
      0
    )
  }

  if (mergedReactions.length === 0) {
    return undefined
  }

  return (
    <div className="mb-2 flex items-center gap-1">
      {mergedReactions.map((reactionGroup) => (
        <HoverTooltip
          content={
            <ReactionTooltipContent
              reactionCount={getReactionGroupTotalCount(reactionGroup)}
              reactionGroup={reactionGroup}
            />
          }
          key={reactionGroup.map((v) => v.name).join(',')}
        >
          <div className="text-grey600 ease-ease bg-slack-button-default hover:shadow-reactions-hover flex h-6 cursor-default items-center gap-1 rounded-full px-2 text-xs transition-shadow duration-300 select-none hover:bg-transparent">
            {reactionGroup.map(
              (reaction) =>
                reaction.url && (
                  <Image
                    alt="이모지"
                    height={16}
                    key={reaction.name}
                    src={reaction.url}
                    unoptimized
                    width={16}
                  />
                )
            )}
            <span className="text-slack-text-primary">
              {getReactionGroupTotalCount(reactionGroup)}
            </span>
          </div>
        </HoverTooltip>
      ))}
    </div>
  )
}
