interface SlackMessageVideoProps {
  height: number | undefined
  src: string
  width: number | undefined
}

export const SlackMessageVideo = ({ src, width, height }: SlackMessageVideoProps) => {
  const aspectRatio = width && height ? height / width : undefined

  return (
    <div className="mb-2 w-full max-w-[480px] overflow-hidden rounded-lg">
      <div
        className="relative w-full"
        style={{ paddingTop: aspectRatio ? `${aspectRatio * 100}%` : 0 }}
      >
        <video className="absolute top-0 left-0 size-full object-cover" controls src={src} />
      </div>
    </div>
  )
}
