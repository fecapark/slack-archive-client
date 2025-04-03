import clsx from 'clsx'
import Image from 'next/image'

interface CommandItemProps {
  description: string
  name: string
  selected?: boolean
}

const CommandItem = ({ name, description, selected }: CommandItemProps) => {
  return (
    <div
      className={clsx('flex h-[60px] w-full items-center', selected && 'bg-[#1264a3] text-white')}
    >
      <div className="flex w-full pl-2">
        <div className="mx-2 mt-1 mb-2.5">
          <div className="relative size-[20px] rounded-md bg-white">
            <Image alt="멘션봇" className="object-contain" fill src="/logo.svg" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[15px] leading-[22px] font-bold">{name}</div>
          <div className="text-[13px] leading-[18px]">
            <span className="mr-0.5 font-bold">명령 · 멘션봇</span>
            <span> · {description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SlackMessageInputCommandOverlay = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="absolute top-0.5 -left-1.5 -translate-y-[100%]" data-command-overlay>
      <div className="w-[435px] rounded-lg bg-white py-2 shadow-[shadow:rgba(29,_28,_29,_0.13)_0_0_0_1px,rgba(0,0,0,0.1)_0_4px_12px_0]">
        {children}
      </div>
    </div>
  )
}

SlackMessageInputCommandOverlay.Item = CommandItem
