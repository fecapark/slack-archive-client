import Image from 'next/image'
import { ImgHTMLAttributes } from 'react'

import { assertNonNullish } from '@/utils/assertion'

export const MdImage = ({
  src,
  alt,
  width,
  height,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  assertNonNullish(src)
  assertNonNullish(alt)
  assertNonNullish(width)
  assertNonNullish(height)

  return (
    <Image
      {...props}
      alt={alt as string}
      height={Number(height)}
      src={src as string}
      width={Number(width)}
    />
  )
}
