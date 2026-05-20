import HeroBanner from '@/components/home/HeroBanner'
import StatsStrip from '@/components/home/StatsStrip'

export const metadata = {
  title: 'StudyDesk – Home',
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsStrip />
      
    </>
  )
}
