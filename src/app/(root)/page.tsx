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

      <div className="flex flex-col items-center gap-10">
        {/* CLS를 방지해요 */}
        <div className="h-[86px] w-[64px]">
          <LandingLogo />
        </div>

        <div className="mb-14 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">멘션하고, 아카이빙해요.</h1>
          <Link href="https://yourssu.slack.com" rel="noopener noreferrer" target="_blank">
            <div className="bg-grey100 border-grey200 group flex items-center gap-1.5 rounded-md border px-2 py-0.5">
              <Image alt="slack" height={16} src="/slack.svg" width={16} />
              <span className="text-text-secondary font-semibold group-hover:underline">
                Yourssu
              </span>
            </div>
          </Link>
        </div>

        <div className="flex w-full max-w-[1300px] flex-wrap gap-18 md:flex-nowrap">
          <div className="flex w-full flex-col items-center gap-12">
            <h3 className="text-xl font-bold">
              원하는 <span className="text-yourssu-primary">키워드</span>로 사람들을{' '}
              <span className="text-yourssu-primary">멘션</span>하세요.
            </h3>
            <div className="flex w-full flex-col justify-between gap-8 select-none">
              <SlackMessageItem
                createdAt="오후 12:39"
                profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U06T3GUSD4J-dca2ff688ee2-72"
                username="Feca [Web FE]"
              >
                {
                  '`@fe` (<@Feca [Web FE]> <@Hanna> <@Juun> <@Ssol> <@EATSTEAK> <@Jerome>)\n안녕하세요!'
                }
              </SlackMessageItem>
              <SlackMessageInput>{convertNewlineToJSX('@fe\n안녕하세요!')}</SlackMessageInput>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-12">
            <h3 className="text-xl font-bold">
              다시 보고 싶은 스레드를 <span className="text-yourssu-primary">아카이브</span>하세요.
            </h3>
            <div className="flex w-full flex-col justify-between gap-8 select-none">
              <div className="flex flex-col gap-3.5">
                <SlackMessageItem
                  createdAt="오전 11:12"
                  profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U06T3GUSD4J-dca2ff688ee2-72"
                  username="Feca [Web FE]"
                >
                  !아카이브
                </SlackMessageItem>
                <SlackMessageItem
                  createdAt="오전 11:14"
                  isBot
                  profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U08FFDZE0VB-d5e5fc94462d-72"
                  username="멘션봇"
                >
                  {'✅ **아카이빙을 완료했어요.**'}
                </SlackMessageItem>
              </div>
              <SlackMessageInput>!아카이브</SlackMessageInput>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
