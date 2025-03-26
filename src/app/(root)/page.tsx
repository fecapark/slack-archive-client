import Image from 'next/image'
import Link from 'next/link'

import { LandingLogo } from '@/app/(root)/components/LandingLogo'
import { SlackMessageInput } from '@/app/(root)/components/SlackMessageInput'
import { SlackMessageItem } from '@/app/(root)/components/SlackMessageItem'
import { GNB } from '@/components/GNB'
import { convertNewlineToJSX } from '@toss/react'

const Home = () => {
  return (
    <div className="w-full">
      <div className="pb-20">
        <GNB />
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* CLS를 방지해요 */}
        <div className="h-[86px] w-[64px]">
          <LandingLogo />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-bold">멘션하고, 아카이빙해요.</span>
          <Link href="https://yourssu.slack.com" rel="noopener noreferrer" target="_blank">
            <div className="bg-grey100 border-grey200 group flex items-center gap-1.5 rounded-md border px-2 py-0.5">
              <Image alt="slack" height={16} src="/slack.svg" width={16} />
              <span className="text-text-secondary font-semibold group-hover:underline">
                Yourssu
              </span>
            </div>
          </Link>
        </div>

        <div className="flex w-full items-center justify-center gap-8 select-none">
          <SlackMessageItem>
            {'`@fe` (<@Feca [Web FE]> <@Hanna> <@Juun> <@Ssol> <@EATSTEAK> <@Jerome>)\n안녕하세요!'}
          </SlackMessageItem>
          <SlackMessageInput>{convertNewlineToJSX('@fe\n안녕하세요!')}</SlackMessageInput>
        </div>
      </div>
    </div>
  )
}

export default Home
