import Link from 'next/link'

import { IconSlack } from '@/components/Icons/IconSlack'

export const YourssuSlackLink = () => {
  return (
    <Link href="https://yourssu.slack.com" rel="noopener noreferrer" target="_blank">
      <div className="bg-grey100 border-grey200 group flex items-center gap-1.5 rounded-md border px-2 py-0.5">
        <IconSlack className="size-4" />
        <span className="text-text-secondary font-semibold group-hover:underline">Yourssu</span>
      </div>
    </Link>
  )
}
