'use client'

import dynamic from 'next/dynamic'
import { tv } from 'tailwind-variants'

const Roller = dynamic(() => import('@fecapark/number-rolling').then((m) => m.Roller), {
  ssr: false,
})

interface ArchiveCountListProps {
  channels: number
  messages: number
  threads: number
}

const counter = tv({
  slots: {
    container: 'flex justify-center font-medium',
    item: 'flex min-w-[180px] flex-col items-center gap-2',
    label: 'text-text-secondary font-semibold',
    placeholder: 'text-grey900 h-[54px]',
    divider: 'bg-grey400 w-[1px] flex-[1_1_0]',
  },
})

export const ArchiveCountList = ({ channels, messages, threads }: ArchiveCountListProps) => {
  const { container, item, placeholder, label, divider } = counter()

  const baseRollerOptions = {
    rollDuration: 1.2,
  }

  return (
    <div className={container()}>
      <div className={item()}>
        <div className={label()}>채널</div>
        <div className={placeholder()}>
          <Roller {...baseRollerOptions} value={channels} />
        </div>
      </div>
      <div className={divider()} />
      <div className={item()}>
        <div className={label()}>스레드</div>
        <div className={placeholder()}>
          <Roller {...baseRollerOptions} value={threads} />
        </div>
      </div>
      <div className={divider()} />
      <div className={item()}>
        <div className={label()}>메시지</div>
        <div className={placeholder()}>
          <Roller {...baseRollerOptions} value={messages} />
        </div>
      </div>
    </div>
  )
}
