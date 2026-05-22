'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { motion } from 'framer-motion'
import Link from 'next/link'
import RoomCard from '@/components/rooms/RoomCard'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function AvailableRooms() {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    api.getLatestRooms()
      .then(data => setRooms(Array.isArray(data) ? data : data.rooms || []))
      .catch(() => { })
  }, [])

  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            {/* Label */}
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Browse Spaces
            </span>
            <h2
              className="font-heading text-base-content font-normal"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
            >
              Recently Listed Rooms
            </h2>
            <p className="text-base-content/55 text-sm mt-2 max-w-md leading-relaxed">
              Freshly added study spaces ready to book — quiet, private, and fully equipped.
            </p>
          </div>

          {/* Desktop "see all" link */}
          <Link
            href="/rooms"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200 shrink-0"
          >
            See All Rooms
            <ArrowIcon />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rooms.map((room) => (
            <motion.div key={room._id} variants={fadeUp}>
              <RoomCard room={room} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile "see all" CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-dark text-sm font-semibold transition-all duration-200 hover:bg-primary-dark"
          >
            See All Rooms <ArrowIcon />
          </Link>
        </motion.div>

        {/* Desktop bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center hidden sm:block"
        >
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-dark transition-all duration-200"
          >
            Explore All Study Rooms <ArrowIcon />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
