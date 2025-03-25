import AutoHeightImage from '@/app/components/AutoHeightImage'

export const GNB = () => {
  return (
    <div className="flex h-[60px] w-full items-center">
      <div className="flex items-center gap-2">
        <div className="w-[40px]">
          <AutoHeightImage alt="Logo" src="/logo.svg" unoptimized />
        </div>
      </div>
    </div>
  )
}
