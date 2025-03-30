import Image from 'next/image'
import { tv } from 'tailwind-variants'

interface InlineEmojiProps {
  name: string
  size: 'large' | 'medium'
  url: string
}

const inlineEmoji = tv({
  slots: {
    container: 'relative inline-block size-[22px] overflow-visible align-top',
    image: 'absolute top-1/2 -mt-[11px] overflow-hidden object-contain',
  },
  variants: {
    size: {
      large: {
        container: 'size-[32px]',
        image: '-mt-[16px]',
      },
      medium: {
        container: 'size-[22px]',
        image: '-mt-[11px]',
      },
    },
  },
})

export const InlineEmoji = ({ name, url, size }: InlineEmojiProps) => {
  const { container, image } = inlineEmoji({ size })
  const sizeLiteral = size === 'large' ? 32 : 22

  return (
    <span className={container()}>
      <Image alt={name} className={image()} height={sizeLiteral} src={url} width={sizeLiteral} />
    </span>
  )
}
