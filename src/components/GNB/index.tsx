import { Do_Hyeon } from 'next/font/google'
import Link from 'next/link'

import AutoHeightImage from '@/components/AutoHeightImage'
import { LinkList } from '@/components/GNB/LinkList'

const DoHyeon = Do_Hyeon({ subsets: ['latin'], weight: '400' })

export const GNB = () => {
  return (
    <header className="flex h-[64px] w-full shrink-0 items-center justify-between px-5 md:justify-start">
      <Link className="mr-[50px] flex items-center gap-3 select-none" href="/">
        <div className="w-[32px]">
          <AutoHeightImage alt="Logo" src="/logo.svg" />
        </div>
        <span className={`text-xl ${DoHyeon.className}`}>멘션봇</span>
      </Link>

      <div className="flex items-center gap-8">
        <LinkList />
      </div>
    </header>
  )
}
