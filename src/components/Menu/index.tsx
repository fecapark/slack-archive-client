'use client'

import { Popover, PopoverProps } from '@/components/Popover'

const ButtonItem = ({
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <Popover.Closeable>
      <button {...props}>{children}</button>
    </Popover.Closeable>
  )
}

/* 
  반드시 'use client' directive를 사용해주세요.
*/
export const Menu = ({ children, ...props }: React.PropsWithChildren<PopoverProps>) => {
  return <Popover {...props}>{children}</Popover>
}

Menu.Target = Popover.Target
Menu.Content = Popover.Content
Menu.ButtonItem = ButtonItem
