'use client'

import dynamic from 'next/dynamic'

import lottieData from '@/../public/ppusung.json'
import { useHover } from '@/hooks/useHover'

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false })

export const LandingLogo = () => {
  const [ref, isHover] = useHover<HTMLDivElement>()

  const option: { direction: -1 | 1; speed: number } = isHover
    ? { speed: 3.5, direction: -1 }
    : { speed: 1.2, direction: 1 }

  return (
    <div ref={ref}>
      <Lottie animationData={lottieData} loop={false} play {...option} />
    </div>
  )
}
