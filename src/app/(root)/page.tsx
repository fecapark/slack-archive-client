import Link from 'next/link'
import { MdArrowOutward } from 'react-icons/md'

import { LandingLogo } from '@/app/(root)/components/LandingLogo'
import { LandingSlackConversation } from '@/app/(root)/components/LandingSlackConversation'
import { YourssuSlackLink } from '@/app/(root)/components/YourssuSlackLink'
import { Footer } from '@/components/Footer'
import { SlackMessageInput } from '@/components/Slack/SlackMessageInput'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { convertNewlineToJSX } from '@toss/react'

const Home = () => {
  const makeStaticSlackTimestamp = (hour: number, minutes: number) => {
    return (new Date(`2000/1/1 ${hour}:${minutes}`).getTime() / 1000).toString()
  }

  return (
    <div className="flex size-full flex-col pt-20">
      <main className="flex grow flex-col items-center gap-10 px-10">
        {/* CLS를 방지해요 */}
        <div className="h-[86px] w-[64px]">
          <LandingLogo />
        </div>

        <div className="mb-14 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">멘션하고, 아카이빙해요.</h1>
          <YourssuSlackLink />
        </div>

        <div className="flex w-full max-w-[1300px] flex-wrap gap-18 md:flex-nowrap">
          <LandingSlackConversation>
            <LandingSlackConversation.Head
              description="키워드를 만들 수도 있어요."
              title={
                <>
                  원하는{' '}
                  <Link className="px-0.5 underline" href="/">
                    키워드
                    <MdArrowOutward className="inline text-base" />
                  </Link>
                  로 사람들을 멘션하세요.
                </>
              }
            />
            <LandingSlackConversation.Slack>
              <SlackMessageItem
                createdAt={makeStaticSlackTimestamp(13, 39)}
                createdAtFormat="오전 10:00"
                profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U06T3GUSD4J-dca2ff688ee2-72"
                username="Feca [Web FE]"
              >
                <SlackMessageItem.Markdown>
                  {
                    '`@fe` (<@Feca [Web FE]> <@Hanna> <@Juun> <@Ssol> <@EATSTEAK> <@Jerome>)\n안녕하세요!'
                  }
                </SlackMessageItem.Markdown>
              </SlackMessageItem>
              <SlackMessageInput>{convertNewlineToJSX('@fe\n안녕하세요!')}</SlackMessageInput>
            </LandingSlackConversation.Slack>
          </LandingSlackConversation>
          <LandingSlackConversation>
            <LandingSlackConversation.Head
              description="90일이 지나도 계속 볼 수 있어요."
              title="다시 보고 싶은 스레드를 아카이브하세요."
            />
            <LandingSlackConversation.Slack>
              <SlackMessageItem
                createdAt={makeStaticSlackTimestamp(11, 12)}
                createdAtFormat="오전 10:00"
                profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U06T3GUSD4J-dca2ff688ee2-72"
                username="Feca [Web FE]"
              >
                <SlackMessageItem.Markdown>!아카이브</SlackMessageItem.Markdown>
              </SlackMessageItem>
              <SlackMessageItem
                createdAt={makeStaticSlackTimestamp(11, 14)}
                createdAtFormat="오전 10:00"
                isBot
                profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U08FFDZE0VB-d5e5fc94462d-72"
                username="멘션봇"
              >
                <SlackMessageItem.Markdown>
                  {'✅ **아카이빙을 완료했어요.**'}
                </SlackMessageItem.Markdown>
              </SlackMessageItem>
              <SlackMessageInput>!아카이브</SlackMessageInput>
            </LandingSlackConversation.Slack>
            <LandingSlackConversation.LinkButton href="/archives">
              아카이브
              <MdArrowOutward className="text-xl" />
            </LandingSlackConversation.LinkButton>
          </LandingSlackConversation>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
