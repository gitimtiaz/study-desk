'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import RoomCard from '@/components/rooms/RoomCard'

const mockRooms = [
  {
    _id: '1',
    name: 'Silent Focus Pod',
    description: 'A fully enclosed single-user pod designed for deep work. Zero noise, zero distractions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop',
    floor: 'Floor 1',
    capacity: '1–2',
    hourlyRate: 4,
    amenities: ['Wi-Fi', 'Quiet Zone', 'Power Outlets'],
  },
  {
    _id: '2',
    name: 'Collaboration Hub',
    description: 'Spacious room with a large whiteboard and projector, ideal for group study sessions.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop',
    floor: 'Floor 2',
    capacity: '4–6',
    hourlyRate: 8,
    amenities: ['Projector', 'Whiteboard', 'Wi-Fi', 'Air Conditioning'],
  },
  {
    _id: '3',
    name: 'Private Reading Room',
    description: 'Cozy two-person room surrounded by bookshelves. Perfect for focused reading or tutoring.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop',
    floor: 'Floor 3',
    capacity: '1–2',
    hourlyRate: 5,
    amenities: ['Quiet Zone', 'Power Outlets', 'Wi-Fi'],
  },
  {
    _id: '4',
    name: 'Tech Lab Alpha',
    description: 'Equipped with high-speed internet and multiple power outlets. Great for coding sessions.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop',
    floor: 'Floor 1',
    capacity: '2–4',
    hourlyRate: 7,
    amenities: ['Wi-Fi', 'Power Outlets', 'Air Conditioning', 'Whiteboard'],
  },
  {
    _id: '5',
    name: 'Open Study Lounge',
    description: 'A bright and airy open-plan room with natural light. Relaxed atmosphere for casual study.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop',
    floor: 'Floor 2',
    capacity: '3–5',
    hourlyRate: 6,
    amenities: ['Wi-Fi', 'Power Outlets'],
  },
  {
    _id: '6',
    name: 'Executive Suite B',
    description: 'Premium private room with ergonomic furniture and a projector. Ideal for presentations.',
    image: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=600&auto=format&fit=crop',
    floor: 'Floor 4',
    capacity: '2–3',
    hourlyRate: 10,
    amenities: ['Projector', 'Air Conditioning', 'Wi-Fi', 'Quiet Zone', 'Power Outlets'],
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function AvailableRooms() {
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
          {mockRooms.map((room) => (
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
