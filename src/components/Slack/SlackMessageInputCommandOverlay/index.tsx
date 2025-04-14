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
      className={clsx(
        'flex h-[60px] w-full items-center',
        selected && 'bg-slack-command-active text-white'
      )}
    >
      <div className="flex w-full pl-2">
        <div className="mx-2 mt-1 mb-2.5">
          <div className="relative size-[20px] rounded-md bg-white">
            <Image alt="멘션봇" className="object-contain" fill src="/logo.svg" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[15px] leading-[22px] font-bold">{name}</div>
          <div className="flex text-[13px] leading-[18px]">
            <span className="mr-0.5 shrink-0 font-bold">명령 · 멘션봇</span>
            <span
              className="grow overflow-hidden text-ellipsis"
              style={{
                whiteSpace: 'initial',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {' '}
              · {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SlackMessageInputCommandOverlay = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="absolute top-0.5 -left-1.5 w-full -translate-y-[100%]" data-command-overlay>
      <div className="shadow-commands-overlay w-full max-w-[435px] rounded-lg bg-white py-2">
        {children}
      </div>
    </div>
  )
}

SlackMessageInputCommandOverlay.Item = CommandItem
