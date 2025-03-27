import clsx from 'clsx'

import { useHover } from '@/hooks/useHover'
import * as Tooltip from '@radix-ui/react-tooltip'

interface Props {
  content: React.ReactNode
  contentProps?: React.ComponentProps<typeof Tooltip.Content>
}

export const HoverTooltip = ({
  children,
  content,
  contentProps,
}: React.PropsWithChildren<Props>) => {
  const [ref, isVisible] = useHover<HTMLButtonElement>()
  const { className, sideOffset, ...otherContentProps } = contentProps ?? {}

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={isVisible && !!content}>
        <Tooltip.Trigger asChild ref={ref}>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            {...otherContentProps}
            className={clsx(
              'max-w-[400px] rounded-lg bg-black px-3 py-2 text-[13px] font-semibold text-white',
              className
            )}
            sideOffset={sideOffset ?? 6}
          >
            <Tooltip.Arrow />
            {content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
