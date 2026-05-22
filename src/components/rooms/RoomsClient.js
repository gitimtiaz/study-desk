'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RoomCard from '@/components/rooms/RoomCard'
import { api } from '@/lib/api'

const AMENITIES = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning']


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] } }),
}

export default function RoomsClient() {
  const [allRooms, setAllRooms] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getRooms()
      .then(data => setAllRooms(Array.isArray(data) ? data : data.rooms || []))
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  const toggleAmenity = (a) =>
    setSelected(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])

  const clearFilters = () => { setSearch(''); setSelected([]) }

  const filtered = allRooms.filter(room => {
    const matchName = room.name.toLowerCase().includes(search.toLowerCase())
    const matchAmenities = selected.every(a => room.amenities.includes(a))
    return matchName && matchAmenities
  })

  const hasFilters = search || selected.length > 0

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="h-72 rounded-2xl bg-base-200 animate-pulse" />
        ))}
      </div>
    </div>
  )
  
  return (
    <div className="min-h-screen bg-base-100">

      {/* Page header */}
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,131,3,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            Browse All
          </span>
          <h1 className="font-heading text-cream font-normal mb-2"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
            Available Study Rooms
          </h1>
          <p className="text-cream/50 text-sm max-w-md leading-relaxed">
            Browse and filter from our full collection of private, distraction-free study spaces.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 bg-base-100 border-b border-base-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

          {/* Top row: search + mobile toggle + count */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by room name..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content placeholder:text-base-content/35 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              {search && (
                <button onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors">
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button onClick={() => setFilterOpen(!filterOpen)}
              className={`md:hidden flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${selected.length > 0
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-base-300 text-base-content/70 bg-base-200'
                }`}>
              <FilterIcon />
              Filters {selected.length > 0 && <span className="w-4 h-4 rounded-full bg-primary text-dark text-[10px] font-bold flex items-center justify-center">{selected.length}</span>}
            </button>

            {/* Desktop amenity chips */}
            <div className="hidden md:flex items-center gap-2 flex-wrap flex-1">
              {AMENITIES.map((a) => (
                <button key={a} onClick={() => toggleAmenity(a)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${selected.includes(a)
                      ? 'bg-primary text-dark border-primary'
                      : 'bg-base-200 text-base-content/65 border-base-300 hover:border-primary/50 hover:text-base-content'
                    }`}>
                  {a}
                </button>
              ))}
              {hasFilters && (
                <button onClick={clearFilters}
                  className="px-3 py-1 rounded-full text-xs font-medium text-primary hover:text-primary-dark transition-colors ml-1">
                  Clear all
                </button>
              )}
            </div>

            {/* Results count */}
            <p className="text-xs text-base-content/50 shrink-0 hidden sm:block">
              {filtered.length} room{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Mobile amenity panel */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden md:hidden"
              >
                <div className="pt-3 pb-1 flex flex-wrap gap-2">
                  {AMENITIES.map((a) => (
                    <button key={a} onClick={() => toggleAmenity(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${selected.includes(a)
                          ? 'bg-primary text-dark border-primary'
                          : 'bg-base-200 text-base-content/65 border-base-300'
                        }`}>
                      {a}
                    </button>
                  ))}
                  {hasFilters && (
                    <button onClick={clearFilters}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-primary">
                      Clear all
                    </button>
                  )}
                </div>
                <p className="text-xs text-base-content/50 pb-2">
                  {filtered.length} room{filtered.length !== 1 ? 's' : ''} found
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      

      {/* Rooms grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
          >
            {filtered.map((room, i) => (
              <motion.div key={room._id} variants={fadeUp} custom={i}>
                <RoomCard room={room} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </div>

    </div>
  )
}

function EmptyState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
        <EmptyIcon />
      </div>
      <h3 className="font-heading text-base-content text-xl mb-2">No rooms found</h3>
      <p className="text-sm text-base-content/50 max-w-xs leading-relaxed mb-6">
        No study rooms match your current search or filters. Try adjusting them.
      </p>
      <button onClick={onClear}
        className="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
        Clear filters
      </button>
    </motion.div>
  )
}

// Icons
function SearchIcon({ className }) {
  return <svg width="15" height="15" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
}
function CloseIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
}
function FilterIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
}
function EmptyIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
}
