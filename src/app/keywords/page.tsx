import Link from 'next/link'
import { MdArrowOutward } from 'react-icons/md'

import { LandingSlackConversation } from '@/app/(root)/components/LandingSlackConversation'
import { Section } from '@/app/keywords/components/Section'
import { SectionGroup } from '@/app/keywords/components/SectionGroup'
import AutoHeightImage from '@/components/AutoHeightImage'
import { Footer } from '@/components/Footer'
import { SlackMessageInput } from '@/components/Slack/SlackMessageInput'
import { SlackMessageItem } from '@/components/Slack/SlackMessageItem'
import { makeStaticSlackTimestamp } from '@/utils/date'
import { convertNewlineToJSX } from '@toss/react'

const KeywordsPage = () => {
  return (
    <div className="overflow-x-hidden px-10 break-keep">
      <div className="flex flex-col items-center gap-24 pt-20">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">키워드</h1>
          <h3 className="text-grey600 text-base font-semibold">
            멘션봇이 인식하는 멘션 키워드들이에요.
          </h3>
        </div>

        <SectionGroup title="팀별 키워드">
          <Section>
            <div className="w-full max-w-[600px]">
              <LandingSlackConversation>
                <LandingSlackConversation.Slack>
                  <SlackMessageItem
                    createdAt={makeStaticSlackTimestamp(13, 39)}
                    createdAtFormat="오전 10:00"
                    profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U06T3GUSD4J-dca2ff688ee2-72"
                    username="Feca [Web FE]"
                  >
                    <SlackMessageItem.Markdown isEdited>
                      {
                        '*`@pm`* (<@Ralph [Web FE]> <@Song> <@Glen> <@Dylan> <@Ren>)\n*`@fe`* (<@Feca [Web FE]> <@Hanna> <@Juun> <@Ssol> <@EATSTEAK> <@Jerome>)\n모두들 안녕하세요!'
                      }
                    </SlackMessageItem.Markdown>
                  </SlackMessageItem>
                  <SlackMessageInput>
                    {convertNewlineToJSX('@pm\n@fe\n모두들 안녕하세요!')}
                  </SlackMessageInput>
                </LandingSlackConversation.Slack>
              </LandingSlackConversation>
            </div>

            <p className="text-center text-lg font-medium whitespace-pre-wrap">
              기본으로 생성되어 있는 유어슈 팀별 키워드들이에요.{'\n'}
              <Link
                className="px-0.5 underline"
                href="https://www.notion.so/yourssu/8c6b6640922344588aeb3a853e39480e?v=dd1f5400a8c840239dd41a262ca54402&pvs=4"
                rel="noopener noreferrer"
                target="_blank"
              >
                유어슈 노션 멤버 DB
                <MdArrowOutward className="inline text-base" />
              </Link>
              를 기반으로 자동으로 생성되고, 갱신돼요.
            </p>
          </Section>
          <Section>
            <div className="w-full max-w-[600px]">
              <SlackMessageInput
                commands={[
                  {
                    name: '/list',
                    description: '멘션봇이 인식하는 키워드 목록을 보여줘요.',
                    selected: true,
                  },
                  {
                    name: '/list-custom',
                    description: '멘션봇이 인식하는 커스텀 키워드 목록을 보여줘요.',
                  },
                ]}
              >
                /list
              </SlackMessageInput>
            </div>

            <p className="text-center text-lg font-medium">
              /list 명령어를 사용해서 모든 키워드를 볼 수 있어요.
            </p>
          </Section>
        </SectionGroup>

        <SectionGroup title="커스텀 키워드">
          <Section>
            <div className="w-full max-w-[600px]">
              <LandingSlackConversation>
                <LandingSlackConversation.Slack>
                  <SlackMessageItem
                    createdAt={makeStaticSlackTimestamp(13, 39)}
                    createdAtFormat="오전 10:00"
                    profileImageUrl="https://ca.slack-edge.com/T2SRCGYPQ-U06T3GUSD4J-dca2ff688ee2-72"
                    username="Feca [Web FE]"
                  >
                    <SlackMessageItem.Markdown isEdited>
                      {
                        '*`@tf-soongpt`* (<@Jerome> <@Leopold> <@Juun> <@Emily> <@Mini>)\n📣 숭피티 TF 멤버들에게 공지해요'
                      }
                    </SlackMessageItem.Markdown>
                  </SlackMessageItem>
                  <SlackMessageInput>
                    {convertNewlineToJSX('@tf-soongpt\n📣 숭피티 TF 멤버들에게 공지해요')}
                  </SlackMessageInput>
                </LandingSlackConversation.Slack>
              </LandingSlackConversation>
            </div>

            <p className="text-center text-lg font-medium">
              {convertNewlineToJSX(
                '원하는 멤버들만 따로 그룹해서 멘션할 수도 있어요.\n언제든지 그룹을 새로 만들고 없앨 수 있어요.'
              )}
            </p>
          </Section>

          <Section>
            <div className="keywords-lg:flex-row flex flex-col-reverse items-center">
              <div className="keywords-lg:w-auto flex w-full flex-col items-center gap-12">
                <div className="w-full max-w-[600px]">
                  <SlackMessageInput
                    commands={[
                      {
                        name: '/add',
                        description: '원하는 멘션 그룹을 추가해요.',
                        selected: true,
                      },
                    ]}
                  >
                    /add
                  </SlackMessageInput>
                </div>

                <p className="text-center text-lg font-medium">
                  /add 명령어를 사용해서 원하는 그룹을 만들 수 있어요.
                </p>
              </div>

              <div className="keywords-lg:-mx-[128px] keywords-lg:ml-0 max-w-[800px] overflow-hidden">
                <AutoHeightImage alt="추가 가이드" className="object-cover" src="/add-guide.png" />
              </div>
            </div>
          </Section>

          <Section>
            <div className="w-full max-w-[600px]">
              <SlackMessageInput
                commands={[
                  {
                    name: '/list-custom',
                    description: '멘션봇이 인식하는 커스텀 키워드 목록을 보여줘요.',
                    selected: true,
                  },
                ]}
              >
                /list
              </SlackMessageInput>
            </div>

            <p className="text-center text-lg font-medium">
              /list-custom 명령어를 사용해서 만들어진 모든 커스텀 키워드들을 볼 수 있어요.
            </p>
          </Section>
        </SectionGroup>
        <Footer />
      </div>
    </div>
  )
}

export default KeywordsPage
