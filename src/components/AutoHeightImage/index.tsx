import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'

type AutoHeightImageProps = Omit<ImageProps, 'fill'>

export default function AutoHeightImage({ alt, className, ...props }: AutoHeightImageProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <Image {...props} alt={alt} className={clsx('!static', className)} fill />
    </div>
  )
}
