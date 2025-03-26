import Image from 'next/image'

import { SlackMarkdown } from '@/components/SlackMarkdown'

interface SlackMessageItemProps {
  children: string // 마크다운 파싱을 위해 문자열로만 받아요.
}

export const SlackMessageItem = ({ children }: SlackMessageItemProps) => {
  return (
    <div className="flex">
      <div className="mr-2 shrink-0">
        <div className="overflow-hidden rounded-md">
          <Image
            alt="Avatar"
            height={36}
            src="https://ca.slack-edge.com/T2SRCGYPQ-U06T3GUSD4J-dca2ff688ee2-72"
            width={36}
          />
        </div>
      </div>
      <div className="flex-[1_1_0]">
        <div className="-mt-1 mb-0.5 flex items-center">
          <span className="font-bold text-[#1d1c1d]">Feca [Web FE]</span>
          &nbsp;&nbsp;
          <span className="text-xs text-[#616061]">오후 12:39</span>
        </div>
        <SlackMarkdown>{children}</SlackMarkdown>
      </div>
    </div>
  )
}
