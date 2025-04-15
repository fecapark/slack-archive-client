import clsx from 'clsx'

import * as PrimitiveDialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

/* 
  AlertDialog 와는 달라요.
  일반 정보 표시의 목적으로만 사용해주세요.
*/

export type DialogProps = PrimitiveDialog.DialogContentProps & {
  className?: string
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const Dialog = ({
  onOpenChange,
  open,
  children,
  className,
  ...props
}: React.PropsWithChildren<DialogProps>) => {
  return (
    <PrimitiveDialog.Root onOpenChange={onOpenChange} open={open}>
      <PrimitiveDialog.Portal>
        <PrimitiveDialog.Overlay className="bg-opacity500 fixed inset-0 z-30" />
        <PrimitiveDialog.Content
          {...props}
          className={clsx(
            'fixed inset-[50%_auto_auto_50%] top-1/2 left-1/2 z-40 flex max-h-[calc(100vh-40px)] w-full max-w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-hidden bg-white outline-0',
            className
          )}
          tabIndex={-1}
        >
          <VisuallyHidden>
            <PrimitiveDialog.Title />
            <PrimitiveDialog.Description />
          </VisuallyHidden>
          {children}
        </PrimitiveDialog.Content>
      </PrimitiveDialog.Portal>
    </PrimitiveDialog.Root>
  )
}
