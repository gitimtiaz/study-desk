'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: 50,   suffix: '+', label: 'Study Rooms',    icon: <RoomIcon /> },
  { value: 200,  suffix: '+', label: 'Happy Students', icon: <StudentIcon /> },
  { value: 1000, suffix: '+', label: 'Hours Booked',   icon: <ClockIcon /> },
  { value: 15,   suffix: '+', label: 'Amenities',      icon: <AmenityIcon /> },
]

// Counts from 0 to target when active flips to true
function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let current = 0
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

function StatItem({ value, suffix, label, icon, active }) {
  const count = useCountUp(value, 1800, active)
  return (
    <div className="flex flex-col items-center text-center gap-2 px-6">
      <span className="text-dark/50 mb-1">{icon}</span>
      <p
        className="font-heading text-dark font-normal leading-none"
        style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
      >
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-dark/65">{label}</p>
    </div>
  )
}

export default function StatsStrip() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  // Trigger count-up once when strip enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-primary relative overflow-hidden">

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #1B1A17 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Vertical divider between items on desktop */}
              {i > 0 && (
                <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-dark/15" />
              )}
              <StatItem {...stat} active={active} />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}

function RoomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function StudentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function AmenityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}
