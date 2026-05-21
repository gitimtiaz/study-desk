'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useSession, signOut } from '@/lib/auth-client'

const publicLinks = [
  { label: 'Home',  href: '/' },
  { label: 'Rooms', href: '/rooms' },
]

const privateLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Rooms',      href: '/rooms' },
  { label: 'Add Room',   href: '/add-room' },
  { label: 'My Listings', href: '/my-listings' },
  { label: 'My Bookings', href: '/my-bookings' },
]

export default function Navbar() {
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled,    setScrolled]    = useState(false)

  const pathname   = usePathname()
  const router     = useRouter()
  const profileRef = useRef(null)

  // auth session
  const { data: session, isPending } = useSession()
  const user     = session?.user
  const navLinks = user ? privateLinks : publicLinks

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const handleLogout = async () => {
    await signOut()
    setProfileOpen(false)
    setMobileOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-cream dark:bg-dark border-b border-primary/20 dark:border-primary/30 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.12)]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 shrink-0">
              <BookIcon />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-heading text-primary">StudyDesk</span>
                <span className="hidden sm:block text-[9px] tracking-[0.18em] uppercase text-dark/35 dark:text-cream/35">
                  Distraction-Free Focus
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href}
                    className={`relative py-1 text-sm transition-colors duration-200 ${
                      isActive
                        ? 'text-primary'
                        : 'text-dark/70 dark:text-cream/75 hover:text-dark dark:hover:text-cream'
                    }`}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full bg-primary transition-transform duration-300 origin-left"
                      style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Loading skeleton while session resolves */}
              {isPending && (
                <div className="hidden md:flex items-center gap-3">
                  <div className="w-16 h-8 rounded-lg bg-base-300 animate-pulse" />
                  <div className="w-20 h-8 rounded-lg bg-base-300 animate-pulse" />
                </div>
              )}

              {/* Public: Login + Register */}
              {!isPending && !user && (
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/login"
                    className="px-4 py-1.5 rounded-lg text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-dark transition-all duration-200">
                    Login
                  </Link>
                  <Link href="/register"
                    className="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
                    Register
                  </Link>
                </div>
              )}

              {/* Private: Profile dropdown */}
              {!isPending && user && (
                <div className="hidden md:block relative" ref={profileRef}>
                  <button onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-black/5 transition-colors">
                    <img
                      src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover outline outline-2 outline-primary outline-offset-1"
                    />
                    <span className="text-sm text-dark dark:text-cream">{user.name?.split(' ')[0]}</span>
                    <ChevronIcon open={profileOpen} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50 bg-white dark:bg-dark border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                      >
                        <div className="px-4 py-3 border-b border-primary/20">
                          <p className="text-sm font-semibold truncate text-dark dark:text-cream">{user.name}</p>
                          <p className="text-xs mt-0.5 truncate text-dark/60 dark:text-cream/60">{user.email}</p>
                        </div>
                        {[
                          { label: 'My Listings',  href: '/my-listings' },
                          { label: 'My Bookings',  href: '/my-bookings' },
                        ].map((item) => (
                          <Link key={item.href} href={item.href}
                            className="flex items-center px-4 py-2.5 text-sm text-dark/80 dark:text-cream/80 hover:bg-black/5 transition-colors">
                            {item.label}
                          </Link>
                        ))}
                        <div className="border-t border-primary/20">
                          <button onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2.5 text-sm text-primary hover:bg-black/5 transition-colors">
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setMobileOpen(true)}
                className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-lg hover:bg-black/5 transition-colors p-2"
                aria-label="Open navigation menu">
                <span className="block h-0.5 w-full rounded-full bg-dark dark:bg-cream" />
                <span className="block h-0.5 w-3/4 rounded-full bg-primary" />
                <span className="block h-0.5 w-full rounded-full bg-dark dark:bg-cream" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 flex flex-col bg-cream dark:bg-dark border-l border-primary/25 dark:border-primary/40 md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-primary/25 dark:border-primary/40">
                <div className="flex items-center gap-4">
                  <BookIcon />
                  <span className="text-xl font-heading text-primary">StudyDesk</span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-dark/50 dark:text-cream/50"
                  aria-label="Close menu">✕</button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-3 py-4 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div key={link.href}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.08 }}>
                      <Link href={link.href}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm transition-all ${
                          isActive ? 'text-primary bg-primary/10' : 'text-dark/70 dark:text-cream/75 hover:bg-black/5'
                        }`}>
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="px-4 py-5 flex flex-col gap-3 border-t border-primary/25 dark:border-primary/40">
                {!user ? (
                  <>
                    <Link href="/login" className="w-full text-center py-2.5 rounded-xl text-sm font-medium border border-primary text-primary">
                      Login
                    </Link>
                    <Link href="/register" className="w-full text-center py-2.5 rounded-xl text-sm font-medium bg-primary text-dark">
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 outline outline-2 outline-primary outline-offset-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-dark dark:text-cream">{user.name}</p>
                      <button onClick={handleLogout} className="text-xs text-primary hover:opacity-80 transition-opacity">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function BookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF8303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="text-dark/50 dark:text-cream/50 transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
