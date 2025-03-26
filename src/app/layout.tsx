import type { Metadata } from 'next'

import localFont from 'next/font/local'

import './globals.css'
import { GNB } from '@/components/GNB'

const pretendard = localFont({
  src: 'fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '유어슈 슬랙 아카이브',
  description: '어떤 일이 있었을까요?',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <div className="flex size-full flex-col">
          <GNB />
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout
