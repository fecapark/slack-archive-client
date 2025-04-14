interface ImagePlaceholderProps {
  height: number
  width: number
}

export const ImagePlaceholder = ({
  width,
  height,
  children,
}: React.PropsWithChildren<ImagePlaceholderProps>) => {
  return (
    <div
      className={
        'bg-grey50 border-slack-stroke-decorative inline-block w-full overflow-hidden rounded-lg border'
      }
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {children}
    </div>
  )
}
