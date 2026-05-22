'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useSession } from '@/lib/auth-client'

// Mock bookings 
const MOCK_BOOKINGS = [
  {
    _id: 'b1',
    room: { _id: '2', name: 'Collaboration Hub', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&auto=format&fit=crop', floor: 'Floor 2' },
    date: '2026-06-15',
    startTime: '10:00', endTime: '13:00',
    totalCost: 24, hourlyRate: 8,
    status: 'confirmed',
    note: 'Group project session',
  },
  {
    _id: 'b2',
    room: { _id: '1', name: 'Silent Focus Pod', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&auto=format&fit=crop', floor: 'Floor 1' },
    date: '2026-06-20',
    startTime: '14:00', endTime: '16:00',
    totalCost: 8, hourlyRate: 4,
    status: 'confirmed',
    note: 'Exam prep — need complete silence',
  },
  {
    _id: 'b3',
    room: { _id: '6', name: 'Executive Suite B', image: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=300&auto=format&fit=crop', floor: 'Floor 4' },
    date: '2026-05-01',
    startTime: '09:00', endTime: '11:00',
    totalCost: 20, hourlyRate: 10,
    status: 'confirmed',
    note: '',
  },
  {
    _id: 'b4',
    room: { _id: '3', name: 'Private Reading Room', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&auto=format&fit=crop', floor: 'Floor 3' },
    date: '2026-06-18',
    startTime: '16:00', endTime: '18:00',
    totalCost: 10, hourlyRate: 5,
    status: 'cancelled',
    note: '',
  },
]

// Future date check (today or later)
function isFuture(dateStr) {
  return new Date(dateStr) >= new Date(new Date().toDateString())
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  })
}

export default function MyBookingsClient() {
  const { data: session, isPending } = useSession()
  const user   = session?.user
  const router = useRouter()

  const [bookings,    setBookings]    = useState(MOCK_BOOKINGS)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [filter, setFilter] = useState('all') 

  useEffect(() => { document.title = 'StudyDesk – My Bookings' }, [])

  useEffect(() => {
    if (!isPending && !user) router.replace('/login')
  }, [isPending, user, router])

  const handleCancel = async () => {
    setCancelLoading(true)
   
    await new Promise(r => setTimeout(r, 700))
    setBookings(p =>
      p.map(b => b._id === cancelTarget._id ? { ...b, status: 'cancelled' } : b)
    )
    setCancelLoading(false)
    setCancelTarget(null)
    toast.success('Booking cancelled')
  }

  const filtered = bookings.filter(b => {
    if (filter === 'confirmed') return b.status === 'confirmed'
    if (filter === 'cancelled') return b.status === 'cancelled'
    return true
  })

  const counts = {
    all:       bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  if (isPending) return <PageSkeleton />

  return (
    <div className="min-h-screen bg-base-100">

      {/* Page header */}
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,131,3,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            Dashboard
          </span>
          <h1 className="font-heading text-cream font-normal"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
            My Bookings
          </h1>
          <p className="text-cream/50 text-sm mt-1">
            {counts.confirmed} confirmed · {counts.cancelled} cancelled
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filter tabs */}
        {bookings.length > 0 && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {[
              { key: 'all',       label: 'All' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'cancelled', label: 'Cancelled' },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filter === key
                    ? 'bg-primary text-dark border-primary'
                    : 'bg-base-200 text-base-content/65 border-base-300 hover:border-primary/40'
                }`}>
                {label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  filter === key ? 'bg-dark/15 text-dark' : 'bg-base-300 text-base-content/50'
                }`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 && bookings.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-base-content/50 text-sm">
            No {filter} bookings found.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((booking, i) => {
              const future   = isFuture(booking.date)
              const canCancel = booking.status === 'confirmed' && future

              return (
                <motion.div key={booking._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`bg-base-100 rounded-2xl border overflow-hidden transition-all duration-200 ${
                    booking.status === 'cancelled'
                      ? 'border-base-300 opacity-70'
                      : 'border-base-300 hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(255,131,3,0.08)]'
                  }`}
                >
                  <div className="flex items-start gap-4 p-4 sm:p-5">

                    {/* Room thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-base-300">
                      {booking.room.image && (
                        <img src={booking.room.image} alt={booking.room.name}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            booking.status === 'cancelled' ? 'grayscale' : ''
                          }`}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <Link href={`/rooms/${booking.room._id}`}
                            className="font-heading text-base-content text-base hover:text-primary transition-colors truncate block">
                            {booking.room.name}
                          </Link>
                          <p className="text-xs text-base-content/50 mt-0.5">{booking.room.floor}</p>
                        </div>
                        {/* Status badge */}
                        <StatusBadge status={booking.status} />
                      </div>

                      {/* Booking details grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 mb-3">
                        <DetailItem icon={<CalendarIcon />} label={formatDate(booking.date)} />
                        <DetailItem icon={<ClockIcon />} label={`${booking.startTime} – ${booking.endTime}`} />
                        <DetailItem icon={<CostIcon />} label={`$${booking.totalCost} total`} highlight />
                      </div>

                      {/* Note */}
                      {booking.note && (
                        <p className="text-xs text-base-content/50 italic mb-3">
                          &ldquo;{booking.note}&rdquo;
                        </p>
                      )}

                      {/* Past label or Cancel button */}
                      <div className="flex items-center gap-3">
                        {!future && booking.status === 'confirmed' && (
                          <span className="text-xs text-base-content/40 flex items-center gap-1">
                            <PastIcon /> Past booking
                          </span>
                        )}
                        {canCancel && (
                          <button onClick={() => setCancelTarget(booking)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-300 text-red-500 hover:bg-red-500/10 transition-all duration-200">
                            <CancelIcon /> Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Cancel confirmation modal */}
      <AnimatePresence>
        {cancelTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={(e) => { if (e.target === e.currentTarget && !cancelLoading) setCancelTarget(null) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm bg-base-100 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.25)] p-6"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4 mx-auto">
                <CancelIcon size={20} />
              </div>
              <h2 className="font-heading text-base-content text-xl text-center mb-2">
                Cancel Booking?
              </h2>
              <p className="text-sm text-base-content/55 text-center leading-relaxed mb-1">
                You&apos;re about to cancel your booking for
              </p>
              <p className="text-sm font-semibold text-base-content text-center mb-1">
                {cancelTarget.room.name}
              </p>
              <p className="text-xs text-base-content/45 text-center mb-6">
                {formatDate(cancelTarget.date)} · {cancelTarget.startTime} – {cancelTarget.endTime}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setCancelTarget(null)} disabled={cancelLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-base-300 text-base-content/70 hover:bg-base-200 transition-all duration-200 disabled:opacity-50">
                  Keep It
                </button>
                <button onClick={handleCancel} disabled={cancelLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
                  {cancelLoading && <SpinnerIcon />}
                  {cancelLoading ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Sub-components

function StatusBadge({ status }) {
  const isConfirmed = status === 'confirmed'
  return (
    <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
      isConfirmed
        ? 'bg-green-500/15 text-green-600 dark:text-green-400'
        : 'bg-red-500/15 text-red-600 dark:text-red-400'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isConfirmed ? 'bg-green-500' : 'bg-red-500'}`} />
      {isConfirmed ? 'Confirmed' : 'Cancelled'}
    </span>
  )
}

function DetailItem({ icon, label, highlight }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${highlight ? 'text-primary font-semibold' : 'text-base-content/55'}`}>
      <span className="shrink-0">{icon}</span>
      {label}
    </div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
        <CalendarIcon size={28} />
      </div>
      <h3 className="font-heading text-base-content text-xl mb-2">No bookings yet</h3>
      <p className="text-sm text-base-content/50 max-w-xs leading-relaxed mb-6">
        You haven&apos;t booked any study rooms yet. Find your perfect space and get focused.
      </p>
      <Link href="/rooms"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
        Explore Rooms →
      </Link>
    </motion.div>
  )
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-dark h-32 animate-pulse" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl border border-base-300 p-5 flex gap-4">
            <div className="w-20 h-20 rounded-xl bg-base-200 animate-pulse shrink-0" />
            <div className="flex-1 flex flex-col gap-2.5">
              <div className="h-4 w-48 rounded bg-base-200 animate-pulse" />
              <div className="h-3 w-32 rounded bg-base-200 animate-pulse" />
              <div className="h-3 w-40 rounded bg-base-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Icons
function CalendarIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
}
function ClockIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
}
function CostIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
}
function CancelIcon({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
}
function PastIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
}
function SpinnerIcon() {
  return <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
}
