'use client'

import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import lottieData from '@/../public/ppusung.json'
import { useHover } from '@/hooks/useHover'

export const LandingLogo = () => {
  const [ref, isHover] = useHover<HTMLDivElement>()

  const option: { direction: -1 | 1; speed: number } = isHover
    ? { speed: 3.5, direction: -1 }
    : { speed: 1.2, direction: 1 }

  return (
    <div ref={ref} style={{ width: 64 }}>
      <Lottie animationData={lottieData} loop={false} play {...option} />
    </div>
  )
}
