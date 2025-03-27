import AutoHeightImage from '@/components/AutoHeightImage'
import { LinkList } from '@/components/GNB/LinkList'

export const GNB = () => {
  return (
    <header className="flex h-[64px] w-full shrink-0 items-center justify-between px-5 md:justify-start">
      <div className="mr-[50px] flex items-center gap-3">
        <div className="w-[32px]">
          <AutoHeightImage alt="Logo" src="/logo.svg" unoptimized />
        </div>
        <span className="text-lg font-bold">멘션봇</span>
      </div>

      <div className="flex items-center gap-8">
        <LinkList />
      </div>
    </header>
  )
}
