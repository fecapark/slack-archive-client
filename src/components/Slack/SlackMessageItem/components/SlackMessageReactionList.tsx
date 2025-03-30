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
          <div className="text-grey600 ease-ease flex h-6 cursor-default items-center gap-1 rounded-full bg-[rgba(29,28,29,0.06)] px-2 text-xs transition-shadow duration-300 select-none hover:bg-transparent hover:shadow-[0_0_0_1px_rgb(124,122,127)]">
            {reactionGroup.map(
              (reaction) =>
                reaction.url && (
                  <Image
                    alt="이모지"
                    height={16}
                    key={reaction.name}
                    src={reaction.url}
                    width={16}
                  />
                )
            )}
            <span className="text-[rgb(29,28,29)]">
              {getReactionGroupTotalCount(reactionGroup)}
            </span>
          </div>
        </HoverTooltip>
      ))}
    </div>
  )
}
