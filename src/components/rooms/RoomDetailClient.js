'use client'

import { api } from '@/lib/api'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useSession } from '@/lib/auth-client'
import BookingModal from '@/components/bookings/BookingModal'


const AMENITIES_ALL = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning']

export default function RoomDetailClient({ id }) {
  const { data: session } = useSession()
  const user = session?.user

  const [bookingOpen, setBookingOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getRoom(id)
    .then(data => setRoom(data.room || data)) 
    .catch(() => { })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const isOwner = !!(user && room && user.id === room.ownerId)
  if (!room) {
    return (
      <div className="min-h-screen bg-base-100 ...">
        ...
      </div>
    )
  }


  if (!room) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
          <HomeIcon />
        </div>
        <h2 className="font-heading text-base-content text-2xl mb-2">Room Not Found</h2>
        <p className="text-sm text-base-content/50 mb-6">This room doesn&apos;t exist or has been removed.</p>
        <Link href="/rooms" className="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
          ← Back to Rooms
        </Link>
      </div>
    )
  }

  const handleDelete = async () => {
    setDeleteLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setDeleteLoading(false)
    setDeleteOpen(false)
    toast.success('Room deleted successfully')
  }

  return (
    <div className="min-h-screen bg-base-100">

      {/* Breadcrumb */}
      <div className="bg-base-200 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-base-content/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-primary transition-colors">Rooms</Link>
            <span>/</span>
            <span className="text-base-content/80 truncate max-w-[200px]">{room.name}</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-w-0"
          >
            {/* Image */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-6">
              {room.image ? (
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #A35709, #FF8303)' }}>
                  <HomeIcon size={56} />
                </div>
              )}
              {/* Booking count badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-dark/80 backdrop-blur-sm text-cream text-xs font-medium px-3 py-1.5 rounded-full">
                <BookingsIcon />
                {room.bookingCount} booking{room.bookingCount !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Title + floor */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <h1 className="font-heading text-base-content font-normal"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                {room.name}
              </h1>
              <span className="shrink-0 text-xs px-3 py-1 rounded-full bg-primary-dark text-cream font-medium mt-1">
                {room.floor}
              </span>
            </div>

            {/* Description */}
            <p className="text-base-content/65 leading-relaxed text-sm mb-8">{room.description}</p>

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: <PeopleIcon />, label: 'Capacity', value: `${room.capacity} people` },
                { icon: <RateIcon />, label: 'Hourly Rate', value: `$${room.hourlyRate}/hr` },
                { icon: <FloorIcon />, label: 'Location', value: room.floor },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-base-200 border border-base-300">
                  <span className="text-primary mt-0.5">{icon}</span>
                  <div>
                    <p className="text-xs text-base-content/50 mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-base-content">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="font-heading text-base-content text-lg mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {AMENITIES_ALL.map((a) => {
                  const has = room.amenities.includes(a)
                  return (
                    <div key={a}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all ${has
                        ? 'bg-primary/10 border-primary/25 text-primary'
                        : 'bg-base-200 border-base-300 text-base-content/35'
                        }`}>
                      {has ? <CheckIcon /> : <XIcon />}
                      {a}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile book button */}
            <div className="lg:hidden">
              {user ? (
                <button onClick={() => setBookingOpen(true)}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
                  Book Now — ${room.hourlyRate}/hr
                </button>
              ) : (
                <Link href="/login"
                  className="block w-full text-center py-3.5 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
                  Login to Book
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right: sticky card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden lg:block w-80 shrink-0"
          >
            <div className="sticky top-[88px] rounded-2xl border border-base-300 bg-base-100 shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">

              {/* Card header */}
              <div className="p-5 border-b border-base-300">
                <h2 className="font-heading text-base-content text-lg leading-snug mb-1">{room.name}</h2>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-dark text-cream">{room.floor}</span>
                  <span className="text-xs text-base-content/50">{room.capacity} people</span>
                </div>
              </div>

              {/* Rate */}
              <div className="px-5 py-4 border-b border-base-300">
                <p className="text-xs text-base-content/50 mb-1">Hourly Rate</p>
                <p className="font-heading text-primary text-3xl">${room.hourlyRate}<span className="text-base font-body text-base-content/50">/hr</span></p>
              </div>

              {/* Book button */}
              <div className="p-5 flex flex-col gap-3">
                {user ? (
                  <button onClick={() => setBookingOpen(true)}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
                    Book Now
                  </button>
                ) : (
                  <Link href="/login"
                    className="block w-full text-center py-3 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
                    Login to Book
                  </Link>
                )}

                {/* Owner controls */}
                {isOwner && (
                  <div className="flex gap-2 pt-1 border-t border-base-300 mt-1">
                    <button onClick={() => setEditOpen(true)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200">
                      <EditIcon /> Edit
                    </button>
                    <button onClick={() => setDeleteOpen(true)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200">
                      <TrashIcon /> Delete
                    </button>
                  </div>
                )}

                {/* Booking count */}
                <p className="text-center text-xs text-base-content/40">
                  <span className="font-medium text-base-content/60">{room.bookingCount}</span> bookings so far
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Booking modal */}
      {bookingOpen && <BookingModal room={room} onClose={() => setBookingOpen(false)} />}

      {/* Edit modal */}
      <AnimatePresence>
        {editOpen && (
          <EditRoomModal room={room} onClose={() => setEditOpen(false)} />
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteOpen && (
          <DeleteModal
            name={room.name}
            loading={deleteLoading}
            onConfirm={handleDelete}
            onClose={() => setDeleteOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  )
}

// Edit Room Modal 
function EditRoomModal({ room, onClose }) {
  const [form, setForm] = useState({
    name: room.name, description: room.description,
    image: room.image || '', floor: room.floor,
    capacity: room.capacity, hourlyRate: room.hourlyRate,
    amenities: [...room.amenities],
  })
  const [loading, setLoading] = useState(false)

  const AMENITIES_ALL = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning']

  const toggleAmenity = (a) =>
    setForm(p => ({
      ...p,
      amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a],
    }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    toast.success('Room updated successfully')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg bg-base-100 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.25)] overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 shrink-0">
          <h2 className="font-heading text-base-content text-lg">Edit Room</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-200 text-base-content/50 transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          {[
            { label: 'Room Name', field: 'name', type: 'text' },
            { label: 'Image URL', field: 'image', type: 'text' },
            { label: 'Floor', field: 'floor', type: 'text' },
            { label: 'Capacity', field: 'capacity', type: 'text' },
            { label: 'Hourly Rate ($)', field: 'hourlyRate', type: 'number' },
          ].map(({ label, field, type }) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">{label}</label>
              <input type={type} value={form[field]}
                onChange={(e) => setForm(p => ({ ...p, [field]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-base-content/80">Description</label>
            <textarea value={form.description} rows={3}
              onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-base-content/80">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES_ALL.map((a) => (
                <button key={a} type="button" onClick={() => toggleAmenity(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${form.amenities.includes(a) ? 'bg-primary text-dark border-primary' : 'bg-base-200 text-base-content/65 border-base-300'
                    }`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-base-300 text-base-content/70 hover:bg-base-200 transition-all duration-200">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <SpinnerIcon />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Delete confirmation modal
function DeleteModal({ name, loading, onConfirm, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-sm bg-base-100 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.25)] p-6"
      >
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4 mx-auto">
          <TrashIcon />
        </div>
        <h2 className="font-heading text-base-content text-xl text-center mb-2">Delete Room?</h2>
        <p className="text-sm text-base-content/55 text-center leading-relaxed mb-6">
          Are you sure you want to delete <strong className="text-base-content">{name}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-base-300 text-base-content/70 hover:bg-base-200 transition-all duration-200">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
            {loading && <SpinnerIcon />}
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Icons
function SpinnerIcon() {
  return <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
}
function HomeIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
}
function BookingsIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
}
function PeopleIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
}
function RateIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
}
function FloorIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
}
function CheckIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
}
function XIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
}
function EditIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
}
function TrashIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
}
