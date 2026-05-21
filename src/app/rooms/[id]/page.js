import RoomDetailClient from '@/components/rooms/RoomDetailClient'

export const metadata = {
  title: 'StudyDesk – Room Details',
}

export default async function RoomDetailPage({ params }) {
  const { id } = await params;

  return <RoomDetailClient id={id} />
}
