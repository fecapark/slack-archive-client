'use client'

import dynamic from 'next/dynamic'

import lottieData from '@/../public/success.json'

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false })

export const Toast = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="bg-grey800 flex items-center rounded-xl py-2 pr-5.5 pl-3 font-semibold text-white">
      <div className="size-9">
        <Lottie animationData={lottieData} loop={false} play speed={1.5} />
      </div>
      {children}
    </div>
  )
}
