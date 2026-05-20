'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// animation variants
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { value: '50+',  label: 'Study Rooms' },
  { value: '200+', label: 'Happy Students' },
  { value: '1K+',  label: 'Hours Booked' },
]

export default function HeroBanner() {
  return (
    <section className="bg-dark min-h-[calc(100vh-64px)] flex items-center relative overflow-hidden">

      {/* Dot-grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,131,3,0.13) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Ambient glow */}
      <div className="absolute top-[30%] -left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(163,87,9,0.18) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full relative z-10 flex flex-col md:flex-row items-center gap-12">

        {/* Left text */}
        <motion.div variants={container} initial="hidden" animate="visible"
          className="w-full md:w-[55%] md:shrink-0">

          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Book · Study · Focus
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="font-heading text-cream font-normal leading-[1.18] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
            Find Your Perfect{' '}
            <span className="text-primary relative inline-block">
              Study Room
              <svg viewBox="0 0 220 12" className="absolute -bottom-1 left-0 w-full h-[10px] overflow-visible">
                <path d="M2 8 Q55 2 110 8 Q165 14 218 6" stroke="#A35709" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className="text-cream/60 text-base leading-[1.75] mb-9 max-w-[480px]">
            Browse and book quiet, private study rooms in your library.
            List your own room and earn. All with real-time conflict detection.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex items-center gap-3.5 flex-wrap mb-11">
            <Link href="/rooms"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] bg-primary text-dark font-semibold text-[15px] transition-all duration-200 hover:bg-primary-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(255,131,3,0.35)]">
              Explore Rooms <ArrowIcon />
            </Link>
            <Link href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] border border-cream/20 text-cream/80 font-medium text-[15px] transition-all duration-200 hover:border-primary hover:text-primary">
              List Your Room
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="flex items-center gap-7 flex-wrap">
            {stats.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-2.5">
                {i > 0 && <span className="w-px h-7 bg-cream/10" />}
                <div>
                  <p className="font-heading text-primary text-[1.4rem] leading-none mb-1">{value}</p>
                  <p className="text-[11px] text-cream/45 tracking-[0.05em]">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right floating cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex w-[45%] shrink-0 justify-center items-center">
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none z-0"
              style={{ background: 'radial-gradient(circle, rgba(255,131,3,0.18) 0%, transparent 70%)' }} />
            <FloatingCards />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function FloatingCards() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-[320px] h-[420px] z-10">

      {/* Back card */}
      <div className="absolute w-[255px] left-1 top-10 z-10 rounded-2xl overflow-hidden opacity-60 shadow-[0_8px_32px_rgba(0,0,0,0.35)] bg-cream"
        style={{ transform: 'rotate(-5.5deg)' }}>
        <div className="h-[90px]" style={{ background: 'linear-gradient(135deg, #4a2600, #7a4006)' }} />
        <div className="p-3">
          <p className="text-[13px] font-semibold text-dark mb-1">Silent Zone A</p>
          <p className="text-[11px] text-primary-dark">Floor 2 · $4/hr</p>
        </div>
      </div>

      {/* Middle card */}
      <div className="absolute w-[255px] right-1 top-5 z-20 rounded-2xl overflow-hidden opacity-75 shadow-[0_8px_32px_rgba(0,0,0,0.35)] bg-cream"
        style={{ transform: 'rotate(4.5deg)' }}>
        <div className="h-[90px]" style={{ background: 'linear-gradient(135deg, #A35709, #d46e00)' }} />
        <div className="p-3">
          <p className="text-[13px] font-semibold text-dark mb-1">Focus Room 3</p>
          <p className="text-[11px] text-primary-dark">Floor 1 · $6/hr</p>
        </div>
      </div>

      {/* Front card */}
      <div className="absolute w-[270px] left-1/2 -translate-x-1/2 top-[68px] z-30 rounded-[20px] overflow-hidden bg-cream shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <div className="h-32 relative flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FF8303, #A35709)' }}>
          <RoomIcon />
          <span className="absolute top-2.5 right-2.5 bg-dark text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            $8/hr
          </span>
          <span className="absolute bottom-2.5 left-2.5 bg-dark/75 text-green-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Available
          </span>
        </div>
        <div className="p-4">
          <p className="font-heading text-[15px] text-dark mb-2">Private Lab B</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] bg-primary-dark/10 text-primary-dark px-2 py-0.5 rounded-full">Floor 3</span>
            <span className="text-[12px] text-dark/55">1–2 people</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {['Wi-Fi', 'Quiet Zone', 'AC'].map((a) => (
              <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-dark/5 text-dark/60 border border-dark/10">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function RoomIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(240,227,202,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
