import Image from 'next/image'
import { tv } from 'tailwind-variants'

import { MessageReactionItem } from '@/types/schema'

interface ReactionTooltipContentProps {
  reactionCount: number
  reactionGroup: MessageReactionItem[]
}

const tooltip = tv({
  base: 'flex max-w-[200px] flex-col items-center',
  variants: {
    size: {
      medium: '',
      large: 'max-w-[400px]',
    },
  },
})

export const ReactionTooltipContent = ({
  reactionGroup,
  reactionCount,
}: ReactionTooltipContentProps) => {
  const multipleReactions = reactionGroup.length > 1
  const tooltipSize = reactionCount > 5 ? 'large' : 'medium'

  const getReactionDescription = (reaction: MessageReactionItem) => {
    if (reaction.count > 1) {
      return `${reaction.users.join(', ')} 및 ${reaction.users.at(-1)}`
    }
    return reaction.users[0]
  }

  return (
    <div className={tooltip({ size: tooltipSize })}>
      <div className="flex flex-wrap items-center gap-1">
        {reactionGroup.map((reaction) => (
          <Image
            alt="이모지"
            className="mb-2 rounded-md bg-white object-contain p-1"
            height={multipleReactions ? 32 : 64}
            key={reaction.name}
            src={reaction.url ?? ''}
            width={multipleReactions ? 32 : 64}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        {reactionGroup.map((reaction) => (
          <div
            className="text-center text-[13px] leading-[1.38463] font-bold text-white"
            key={reaction.name}
          >
            {getReactionDescription(reaction)} 님이{' '}
            <span className="text-[#ffffffb3]">:{reaction.name}:</span> 이모티콘으로 반응했습니다.
          </div>
        ))}
      </div>
    </div>
  )
}
