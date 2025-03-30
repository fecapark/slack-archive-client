'use client'

import Image from 'next/image'
import { tv } from 'tailwind-variants'

import { HoverTooltip } from '@/components/HoverTooltip'
import { MessageReactionItem } from '@/types/schema'

interface SlackMessageReactionListProps {
  reactions: MessageReactionItem[]
}

const tooltip = tv({
  base: 'flex max-w-[200px] flex-col items-center',
  variants: {
    size: {
      base: '',
      large: 'max-w-[400px]',
    },
  },
})

const ReactionTooltipContent = ({ reaction }: { reaction: MessageReactionItem }) => {
  const tooltipSize = reaction.count > 5 ? 'large' : 'base'

  const getReactionDescription = () => {
    if (reaction.count > 1) {
      return `${reaction.users.join(', ')} 및 ${reaction.users.at(-1)}`
    }
    return reaction.users[0]
  }

  return (
    <div className={tooltip({ size: tooltipSize })}>
      <Image
        alt="이모지"
        className="mb-2 rounded-md bg-white object-contain p-1"
        height={64}
        src={reaction.url ?? ''}
        width={64}
      />
      <div className="text-center text-[13px] leading-[1.38463] font-bold text-white">
        {getReactionDescription()} 님이 <span className="text-[#ffffffb3]">:{reaction.name}:</span>{' '}
        이모티콘으로 반응했습니다.
      </div>
    </div>
  )
}

export const SlackMessageReactionList = ({ reactions }: SlackMessageReactionListProps) => {
  return (
    <div className="mb-2 flex items-center gap-1">
      {reactions
        .filter(({ url }) => !!url)
        .map((reaction) => (
          <HoverTooltip
            content={<ReactionTooltipContent reaction={reaction} />}
            key={reaction.name}
          >
            <div className="text-grey600 flex h-6 cursor-default items-center gap-1 rounded-full bg-[rgba(29,28,29,0.06)] px-2 text-xs select-none hover:bg-transparent hover:shadow-[0_0_0_1px_rgb(124,122,127)]">
              <Image alt="이모지" height={16} src={reaction.url!} width={16} />
              <span className="text-[rgb(29,28,29)]">{reaction.count}</span>
            </div>
          </HoverTooltip>
        ))}
    </div>
  )
}
