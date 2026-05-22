'use client'

import { api } from '@/lib/api'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useSession } from '@/lib/auth-client'

const AMENITIES_ALL = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning']

export default function MyListingsClient() {
  const { data: session, isPending } = useSession()
  const user = session?.user
  const router = useRouter()

  const [listings, setListings] = useState([])
  const [editRoom, setEditRoom] = useState(null)
  const [deleteRoom, setDeleteRoom] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { document.title = 'StudyDesk – My Listings' }, [])

  useEffect(() => {
    if (!isPending && !user) router.replace('/login')
  }, [isPending, user, router])

  // useEffect(() => {
  //   if (!user) return
  //   api.getMyListings()
  //     .then(data => setListings(data.room || data))
  //     .catch(() => toast.error('Failed to load listings'))
  //     .finally(() => setLoading(false))
  // }, [user])

  useEffect(() => {
    if (!user) return

    api.getMyListings()
      .then(data => {
        setListings(
          Array.isArray(data)
          ? data
          : data.rooms || []
        )
      })
      .catch(() => {
        setListings([])
        toast.error('Failed to load listings')
      })
      .finally(() => setLoading(false))
  }, [user])

  const handleDelete = async () => {
    setDeleteLoading(true)

    await api.deleteRoom(deleteRoom._id)
    setListings(p => p.filter(r => r._id !== deleteRoom._id))
    setDeleteLoading(false)
    setDeleteRoom(null)
    toast.success('Room deleted successfully')
  }

  const handleEditSave = async (updated) => {

    await api.updateRoom(updated._id, updated)
    setListings(p => p.map(r => r._id === updated._id ? { ...r, ...updated } : r))
    toast.success('Room updated successfully')
    setEditRoom(null)
  }

  if (isPending || loading) return <PageSkeleton />

  return (
    <div className="min-h-screen bg-base-100">

      {/* Page header */}
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,131,3,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Dashboard
            </span>
            <h1 className="font-heading text-cream font-normal"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
              My Listings
            </h1>
            <p className="text-cream/50 text-sm mt-1">
              {listings.length} room{listings.length !== 1 ? 's' : ''} listed
            </p>
          </div>
          <Link href="/add-room"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
            <PlusIcon /> Add Room
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {listings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border border-base-300 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-base-200 border-b border-base-300">
                    {['Room', 'Floor', 'Rate', 'Bookings', 'Actions'].map(h => (
                      <th key={h}
                        className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-base-content/50">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  {listings.map((room, i) => (
                    <motion.tr key={room._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-base-100 hover:bg-base-200 transition-colors duration-150 group">

                      {/* Room */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-base-300">
                            {room.image && (
                              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-base-content truncate max-w-[200px]">{room.name}</p>
                            <p className="text-xs text-base-content/45 truncate max-w-[200px]">{room.description}</p>
                          </div>
                        </div>
                      </td>

                      {/* Floor */}
                      <td className="px-5 py-4">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-primary-dark text-cream font-medium">
                          {room.floor}
                        </span>
                      </td>

                      {/* Rate */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-primary">${room.hourlyRate}/hr</span>
                      </td>

                      {/* Bookings */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-base-content/65">
                          <BookingsIcon />
                          {room.bookingCount}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditRoom(room)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200">
                            <EditIcon /> Edit
                          </button>
                          <button onClick={() => setDeleteRoom(room)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-300 text-red-500 hover:bg-red-500/10 transition-all duration-200">
                            <TrashIcon /> Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card stack */}
            <div className="flex flex-col gap-4 md:hidden">
              {listings.map((room, i) => (
                <motion.div key={room._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
                  <div className="flex items-start gap-4 p-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-base-300">
                      {room.image && (
                        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-base-content text-sm mb-1 truncate">{room.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-dark text-cream">{room.floor}</span>
                        <span className="text-xs font-semibold text-primary">${room.hourlyRate}/hr</span>
                        <span className="text-xs text-base-content/50 flex items-center gap-1">
                          <BookingsIcon />{room.bookingCount} bookings
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-base-300">
                    <button onClick={() => setEditRoom(room)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-primary hover:bg-primary/5 transition-colors border-r border-base-300">
                      <EditIcon /> Edit
                    </button>
                    <button onClick={() => setDeleteRoom(room)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-red-500 hover:bg-red-500/5 transition-colors">
                      <TrashIcon /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit modal */}
      <AnimatePresence>
        {editRoom && (
          <EditRoomModal
            room={editRoom}
            onClose={() => setEditRoom(null)}
            onSave={handleEditSave}
          />
        )}
      </AnimatePresence>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteRoom && (
          <DeleteModal
            name={deleteRoom.name}
            loading={deleteLoading}
            onConfirm={handleDelete}
            onClose={() => setDeleteRoom(null)}
          />
        )}
      </AnimatePresence>

    </div>
  )
}

// Edit Room Modal
function EditRoomModal({ room, onClose, onSave }) {
  const [form, setForm] = useState({
    name: room.name, description: room.description,
    image: room.image || '', floor: room.floor,
    capacity: room.capacity, hourlyRate: room.hourlyRate,
    amenities: [...(room.amenities || [])],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const toggleAmenity = (a) =>
    setForm(p => ({
      ...p,
      amenities: (p.amenities || []).includes(a)
        ? p.amenities.filter(x => x !== a)
        : [...p.amenities, a],
    }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onSave({ ...room, ...form })
    setLoading(false)
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
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-200 text-base-content/50 transition-colors">✕</button>
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${((form.amenities || []).includes(a))
                    ? 'bg-primary text-dark border-primary'
                    : 'bg-base-200 text-base-content/65 border-base-300 hover:border-primary/40'
                    }`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2 shrink-0">
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
          <TrashIcon size={20} />
        </div>
        <h2 className="font-heading text-base-content text-xl text-center mb-2">Delete Room?</h2>
        <p className="text-sm text-base-content/55 text-center leading-relaxed mb-6">
          Are you sure you want to delete{' '}
          <strong className="text-base-content">{name}</strong>?
          This cannot be undone.
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

// Empty state
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
        <HomeIcon />
      </div>
      <h3 className="font-heading text-base-content text-xl mb-2">No listings yet</h3>
      <p className="text-sm text-base-content/50 max-w-xs leading-relaxed mb-6">
        You haven&apos;t listed any rooms yet. Add your first room and start earning.
      </p>
      <Link href="/add-room"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
        <PlusIcon /> Add Your First Room
      </Link>
    </motion.div>
  )
}

// Page skeleton
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-dark h-32 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border border-base-300 overflow-hidden">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-base-300 last:border-0">
              <div className="w-12 h-12 rounded-xl bg-base-200 animate-pulse shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 w-48 rounded bg-base-200 animate-pulse" />
                <div className="h-3 w-32 rounded bg-base-200 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-16 rounded-lg bg-base-200 animate-pulse" />
                <div className="h-8 w-16 rounded-lg bg-base-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Icons
function PlusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
}
function EditIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
}
function TrashIcon({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
}
function BookingsIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
}
function HomeIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
}
function SpinnerIcon() {
  return <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
}
