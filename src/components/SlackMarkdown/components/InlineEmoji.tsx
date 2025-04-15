import Image from 'next/image'
import { tv } from 'tailwind-variants'

import { HoverTooltip } from '@/components/HoverTooltip'

interface InlineEmojiProps {
  name: string
  size: 'large' | 'medium'
  url: string
}

const inlineEmoji = tv({
  slots: {
    container: 'relative inline-block size-5.5 overflow-visible align-top',
    image: 'absolute top-1/2 -mt-[11px] overflow-hidden object-contain',
  },
  variants: {
    size: {
      large: {
        container: 'size-8',
        image: '-mt-[16px]',
      },
      medium: {
        container: 'size-5.5',
        image: '-mt-[11px]',
      },
    },
  },
})

const TooltipContent = ({ name, url }: { name: string; url: string }) => {
  return (
    <div className="flex max-w-[200px] flex-col items-center">
      <Image
        alt="이모지"
        className="mb-2 rounded-md bg-white object-contain p-1"
        height={64}
        src={url}
        unoptimized
        width={64}
      />
      <div className="text-center text-[13px] leading-[18px] font-bold text-white">:{name}:</div>
    </div>
  )
}

export const InlineEmoji = ({ name, url, size }: InlineEmojiProps) => {
  const { container, image } = inlineEmoji({ size })
  const sizeLiteral = size === 'large' ? 32 : 22

  return (
    <HoverTooltip content={<TooltipContent name={name} url={url} />}>
      <span className={container()}>
        <Image
          alt={name}
          className={image()}
          height={sizeLiteral}
          src={url}
          unoptimized
          width={sizeLiteral}
        />
      </span>
    </HoverTooltip>
  )
}
