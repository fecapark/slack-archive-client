import Link from 'next/link'

import AutoHeightImage from '@/components/AutoHeightImage'

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
        <Link className="disabled:text-text-disabled text-lg font-extrabold" href="/">
          홈
        </Link>
        <Link className="text-text-disabled text-lg font-extrabold" href="/">
          키워드
        </Link>
        <Link className="text-text-disabled text-lg font-extrabold" href="/">
          아카이브
        </Link>
      </div>
    </header>
  )
}
