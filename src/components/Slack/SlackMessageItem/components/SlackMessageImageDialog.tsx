'use client'

import Image from 'next/image'

import { Dialog, DialogProps } from '@/components/Dialog'

type SlackMessageImageDialogProps = DialogProps & {
  height: number | undefined
  src: string
  width: number | undefined
}

export const SlackMessageImageDialog = ({
  open,
  onOpenChange,
  src,
  width,
  height,
}: SlackMessageImageDialogProps) => {
  const aspectRatio = width && height ? width / height : 1
  const padding = 20

  return (
    <Dialog
      className="animate-dialog-fadein !size-fit !max-h-none !max-w-none !bg-transparent"
      onOpenChange={onOpenChange}
      open={open}
    >
      <div
        className="relative"
        style={{
          width: `calc(min(100vw, calc(100vh * ${aspectRatio})) - ${padding * 2}px)`,
          height: `calc(min(100vh, calc(100vw * ${1 / aspectRatio})) - ${padding * 2}px)`,
          aspectRatio: `${width ?? 1}/${height ?? 1}`,
        }}
      >
        <Image alt="이미지" className="rounded-2xl" fill loading="eager" src={src} />
      </div>
    </Dialog>
  )
}
