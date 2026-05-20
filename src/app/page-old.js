import HeroBanner from '@/components/home/HeroBanner'
import StatsStrip from '@/components/home/StatsStrip'
import AvailableRooms from '@/components/home/AvailableRooms'

export const metadata = {
  title: 'StudyDesk – Home',
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsStrip />
      <AvailableRooms />
    </>
  )
}
