import { LandingLogo } from '@/app/(root)/components/LandingLogo'
import { GNB } from '@/components/GNB'

const Home = () => {
  return (
    <div className="w-full">
      <div className="pb-20">
        <GNB />
      </div>

      <div className="flex flex-col items-center">
        <LandingLogo />
      </div>
    </div>
  )
}

export default Home
