'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    icon: <SearchIcon />,
    title: 'Search',
    description: 'Browse available rooms by name, floor, or amenities. Filter by rate or capacity to find exactly what you need.',
  },
  {
    icon: <CalendarIcon />,
    title: 'Book',
    description: 'Pick your date and preferred time slot, review the auto-calculated cost, and confirm in seconds.',
  },
  {
    icon: <BookOpenIcon />,
    title: 'Study',
    description: 'Show up to your reserved room, settle in, and get into deep focus mode — completely distraction-free.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            Simple Process
          </span>
          <h2
            className="font-heading text-base-content font-normal"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
          >
            How It Works
          </h2>
          <p className="text-base-content/55 text-sm mt-3 max-w-md mx-auto leading-relaxed">
            From discovery to deep focus in three effortless steps.
          </p>
        </motion.div>

        {/* Desktop layout flex row with connectors */}
        <div className="hidden lg:flex items-start">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center flex-1 px-6"
              >
                {/* Number + icon stacked */}
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary text-dark font-heading text-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(255,131,3,0.35)]">
                    {i + 1}
                  </div>
                  {/* Floating icon badge */}
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-base-100 border-2 border-primary/30 flex items-center justify-center text-primary">
                    <span className="scale-75">{step.icon}</span>
                  </div>
                </div>
                <h3 className="font-heading text-base-content text-xl mb-3">{step.title}</h3>
                <p className="text-sm text-base-content/55 leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>

              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                  className="flex-none w-24 flex items-center mt-7 origin-left"
                >
                  <div className="w-full border-t-2 border-dashed border-primary/35" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile layout vertical stack */}
        <div className="flex flex-col gap-8 lg:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-5"
            >
              {/* Left: number + vertical connector */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary text-dark font-heading text-xl flex items-center justify-center shadow-[0_4px_16px_rgba(255,131,3,0.3)]">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2 min-h-[32px] border-l-2 border-dashed border-primary/30" />
                )}
              </div>
              {/* Right: content */}
              <div className="pt-2 pb-4">
                <div className="flex items-center gap-2 text-primary mb-2">
                  {step.icon}
                  <h3 className="font-heading text-base-content text-lg">{step.title}</h3>
                </div>
                <p className="text-sm text-base-content/55 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function BookOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
