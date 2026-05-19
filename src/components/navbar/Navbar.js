'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useTheme } from '@/context/ThemeContext'

const publicLinks = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
]

const privateLinks = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Add Room', href: '/add-room' },
  { label: 'My Listings', href: '/my-listings' },
  { label: 'My Bookings', href: '/my-bookings' },
]

const MOCK_USER = {
  name: 'Imtiaz Ahmed',
  email: 'imtiaz@studydesk.com',
  image: 'https://api.dicebear.com/7.x/initials/svg?seed=IA&backgroundColor=FF8303&textColor=1B1A17',
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null) 

  const pathname = usePathname()
  const profileRef = useRef(null)
  const { theme } = useTheme()

  const isDark = theme === 'dark'
  const navLinks = user ? privateLinks : publicLinks

  // Colors based on theme
  const navBg = isDark ? '#1B1A17' : '#F0E3CA'
  const navBorder = isDark ? 'rgba(163,87,9,0.3)' : 'rgba(163,87,9,0.2)'
  const linkColor = isDark ? 'rgba(240,227,202,0.75)' : 'rgba(27,26,23,0.7)'
  const linkActiveColor = '#FF8303'
  const linkHoverColor = isDark ? '#F0E3CA' : '#1B1A17'
  const drawerBg = isDark ? '#1B1A17' : '#F0E3CA'
  const drawerBorder = isDark ? 'rgba(163,87,9,0.4)' : 'rgba(163,87,9,0.25)'
  const dropdownBg = isDark ? '#1B1A17' : '#ffffff'
  const dropdownText = isDark ? 'rgba(240,227,202,0.8)' : 'rgba(27,26,23,0.8)'
  const closeColor = isDark ? 'rgba(240,227,202,0.5)' : 'rgba(27,26,23,0.5)'
  const profileName = isDark ? '#F0E3CA' : '#1B1A17'
  const subtitleColor = isDark ? 'rgba(240,227,202,0.35)' : 'rgba(27,26,23,0.35)'
  const hamburgerColor = isDark ? '#F0E3CA' : '#1B1A17'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: navBg,
          borderBottom: `1px solid ${navBorder}`,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo icon and text block */}
            <Link href="/" className="flex items-center gap-4 flex-shrink-0 group">
              <BookIcon />
              <div className="flex flex-col leading-tight">
                <span
                  className="text-xl font-normal"
                  style={{ color: '#FF8303', fontFamily: 'var(--font-heading)' }}
                >
                  StudyDesk
                </span>
                <span
                  className="text-[9px] tracking-[0.18em] uppercase hidden sm:block"
                  style={{ color: subtitleColor, fontFamily: 'var(--font-body)' }}
                >
                  Distraction-Free Focus
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative py-1 text-sm transition-colors duration-200"
                    style={{
                      color: isActive ? linkActiveColor : linkColor,
                      fontFamily: 'var(--font-body)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = linkHoverColor
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = linkColor
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full transition-transform duration-300 origin-left"
                      style={{
                        backgroundColor: '#FF8303',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Public: Login + Register */}
              {!user && (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border"
                    style={{
                      borderColor: '#FF8303',
                      color: '#FF8303',
                      fontFamily: 'var(--font-body)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF8303'
                      e.currentTarget.style.color = '#1B1A17'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#FF8303'
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: '#FF8303',
                      color: '#1B1A17',
                      fontFamily: 'var(--font-body)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A35709')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF8303')}
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Private: Profile dropdown */}
              {user && (
                <div className="hidden md:block relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-colors duration-200 hover:bg-black/5"
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                      style={{ outline: '2px solid #FF8303', outlineOffset: '1px' }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: profileName, fontFamily: 'var(--font-body)' }}
                    >
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronIcon open={profileOpen} color={linkColor} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50"
                        style={{
                          backgroundColor: dropdownBg,
                          border: `1px solid ${navBorder}`,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        }}
                      >
                        <div
                          className="px-4 py-3"
                          style={{ borderBottom: `1px solid ${navBorder}` }}
                        >
                          <p
                            className="text-sm font-semibold truncate"
                            style={{ color: profileName, fontFamily: 'var(--font-body)' }}
                          >
                            {user.name}
                          </p>
                          <p
                            className="text-xs mt-0.5 truncate"
                            style={{ color: linkColor, fontFamily: 'var(--font-body)' }}
                          >
                            {user.email}
                          </p>
                        </div>
                        {[
                          { label: 'My Listings', href: '/my-listings' },
                          { label: 'My Bookings', href: '/my-bookings' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-black/5"
                            style={{ color: dropdownText, fontFamily: 'var(--font-body)' }}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div style={{ borderTop: `1px solid ${navBorder}` }}>
                          <button
                            onClick={() => { setUser(null); setProfileOpen(false) }}
                            className="w-full flex items-center px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-black/5"
                            style={{ color: '#FF8303', fontFamily: 'var(--font-body)' }}
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-lg hover:bg-black/5 transition-colors px-1.5"
                aria-label="Open navigation menu"
              >
                <span className="block h-0.5 rounded-full w-full" style={{ backgroundColor: hamburgerColor }} />
                <span className="block h-0.5 rounded-full w-3/4" style={{ backgroundColor: '#FF8303' }} />
                <span className="block h-0.5 rounded-full w-full" style={{ backgroundColor: hamburgerColor }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DEV ONLY */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setUser(user ? null : MOCK_USER)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ backgroundColor: '#A35709', color: '#F0E3CA', fontFamily: 'var(--font-body)', opacity: 0.7 }}
        >
          DEV: {user ? 'Mock Logout' : 'Mock Login'}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 md:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 flex flex-col md:hidden"
              style={{
                backgroundColor: drawerBg,
                borderLeft: `1px solid ${drawerBorder}`,
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: `1px solid ${drawerBorder}` }}
              >
                <div className="flex items-center gap-4">
                  <BookIcon />
                  <span
                    className="text-xl"
                    style={{ color: '#FF8303', fontFamily: 'var(--font-heading)' }}
                  >
                    StudyDesk
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-sm"
                  style={{ color: closeColor }}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col px-3 py-4 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.08 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center px-4 py-3 rounded-xl text-sm transition-all duration-150"
                        style={{
                          color: isActive ? '#FF8303' : linkColor,
                          backgroundColor: isActive ? 'rgba(255,131,3,0.1)' : 'transparent',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Drawer footer */}
              <div
                className="px-4 py-5 flex flex-col gap-3"
                style={{ borderTop: `1px solid ${drawerBorder}` }}
              >
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      className="w-full text-center py-2.5 rounded-xl text-sm font-medium border transition-all duration-200"
                      style={{ borderColor: '#FF8303', color: '#FF8303', fontFamily: 'var(--font-body)' }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="w-full text-center py-2.5 rounded-xl text-sm font-medium"
                      style={{ backgroundColor: '#FF8303', color: '#1B1A17', fontFamily: 'var(--font-body)' }}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      style={{ outline: '2px solid #FF8303', outlineOffset: '1px' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: profileName, fontFamily: 'var(--font-body)' }}
                      >
                        {user.name}
                      </p>
                      <button
                        onClick={() => { setUser(null); setMobileOpen(false) }}
                        className="text-xs hover:opacity-80 transition-opacity"
                        style={{ color: '#FF8303', fontFamily: 'var(--font-body)' }}
                      >
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
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF8303"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function ChevronIcon({ open, color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke={color || 'rgba(240,227,202,0.5)'} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
