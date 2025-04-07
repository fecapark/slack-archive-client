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
        'bg-grey50 inline-block w-full overflow-hidden rounded-lg border border-[rgba(29,28,29,0.13)]'
      }
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {children}
    </div>
  )
}
