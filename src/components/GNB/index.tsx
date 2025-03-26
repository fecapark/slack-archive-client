import AutoHeightImage from '@/components/AutoHeightImage'

export const GNB = () => {
  return (
    <div className="flex h-[64px] w-full items-center px-5">
      <div className="flex items-center gap-3">
        <div className="w-[32px]">
          <AutoHeightImage alt="Logo" src="/logo.svg" unoptimized />
        </div>
        <span className="text-lg font-bold">멘션봇</span>
      </div>
    </div>
  )
}
