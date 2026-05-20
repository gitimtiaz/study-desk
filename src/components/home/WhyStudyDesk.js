'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: <ShieldIcon />,
    title: 'Conflict-Free Booking',
    description: 'Smart time-slot detection automatically prevents double bookings so your reservation is always secure.',
  },
  {
    icon: <ZapIcon />,
    title: 'Instant Confirmation',
    description: 'Your booking is confirmed the moment you submit — no waiting, no approval process, no back and forth.',
  },
  {
    icon: <ClipboardIcon />,
    title: 'Manage Your Listings',
    description: 'List rooms you own, track who booked them, and manage everything from a clean personal dashboard.',
  },
  {
    icon: <TargetIcon />,
    title: 'Focused Environment',
    description: 'Every room is vetted for quietness. Verified students only — zero distractions, maximum productivity.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function WhyStudyDesk() {
  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            Why Choose Us
          </span>
          <h2
            className="font-heading text-base-content font-normal"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
          >
            Why StudyDesk?
          </h2>
          <p className="text-base-content/55 text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Built specifically for students who take their study time seriously.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group flex items-start gap-5 p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(255,131,3,0.08)] transition-all duration-300"
            >
              {/* Icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-dark group-hover:border-primary">
                {feature.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-base-content text-lg mb-2 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-base-content/55 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function ZapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  )
}
function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
