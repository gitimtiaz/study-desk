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
  // demo access.
  const [user, setUser] = useState(null) 

  const pathname = usePathname()
  const profileRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const navLinks = user ? privateLinks : publicLinks

  // Theme-aware colors
  const navBg        = isDark ? '#1B1A17' : '#F0E3CA'
  const navBorder    = isDark ? 'rgba(163,87,9,0.3)' : 'rgba(163,87,9,0.2)'
  const linkColor    = isDark ? 'rgba(240,227,202,0.75)' : 'rgba(27,26,23,0.65)'
  const linkHover    = isDark ? '#F0E3CA' : '#1B1A17'
  const drawerBg     = isDark ? '#1B1A17' : '#F0E3CA'
  const dropdownBg   = isDark ? '#222018' : '#ffffff'
  const dropdownText = isDark ? 'rgba(240,227,202,0.8)' : 'rgba(27,26,23,0.8)'
  const profileName  = isDark ? '#F0E3CA' : '#1B1A17'
  const subtitleCol  = isDark ? 'rgba(240,227,202,0.32)' : 'rgba(27,26,23,0.32)'
  const closeCol     = isDark ? 'rgba(240,227,202,0.45)' : 'rgba(27,26,23,0.45)'
  const hamColor     = isDark ? '#F0E3CA' : '#1B1A17'

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
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: navBg,
          borderBottom: `1px solid ${navBorder}`,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '64px',
            }}
          >

            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',     
                flexShrink: 0,
                textDecoration: 'none',
              }}
            >
              <BookIcon />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ color: '#FF8303', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                  StudyDesk
                </span>
                <span
                  className="hidden sm:block"
                  style={{
                    color: subtitleCol,
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Distraction-Free Focus
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div
              className="hidden md:flex"
              style={{
                alignItems: 'center',
                gap: '32px',     
              }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      position: 'relative',
                      padding: '4px 0',
                      fontSize: '14px',
                      color: isActive ? '#FF8303' : linkColor,
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = linkHover }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = linkColor }}
                  >
                    {link.label}
                    {/* Active underline */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        borderRadius: '9999px',
                        backgroundColor: '#FF8303',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Right section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',       
              }}
            >
              <ThemeToggle />

              {/* Public: Login + Register */}
              {!user && (
                <div
                  className="hidden md:flex"
                  style={{ alignItems: 'center', gap: '10px' }}
                >
                  <Link
                    href="/login"
                    style={{
                      padding: '6px 18px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      border: '1.5px solid #FF8303',
                      color: '#FF8303',
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
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
                    style={{
                      padding: '6px 18px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      backgroundColor: '#FF8303',
                      color: '#1B1A17',
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
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
                <div className="hidden md:block" style={{ position: 'relative' }} ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '9999px',
                      padding: '4px 12px 4px 4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        outline: '2px solid #FF8303',
                        outlineOffset: '1px',
                      }}
                    />
                    <span style={{ fontSize: '14px', color: profileName, fontFamily: 'var(--font-body)' }}>
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
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 'calc(100% + 8px)',
                          width: '208px',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          zIndex: 50,
                          backgroundColor: dropdownBg,
                          border: `1px solid ${navBorder}`,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        }}
                      >
                        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${navBorder}` }}>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: profileName, fontFamily: 'var(--font-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {user.name}
                          </p>
                          <p style={{ fontSize: '12px', marginTop: '2px', color: linkColor, fontFamily: 'var(--font-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                            style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', fontSize: '14px', color: dropdownText, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background 0.15s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div style={{ borderTop: `1px solid ${navBorder}` }}>
                          <button
                            onClick={() => { setUser(null); setProfileOpen(false) }}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '10px 16px', fontSize: '14px', color: '#FF8303', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
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
                className="md:hidden"
                aria-label="Open navigation menu"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  padding: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ display: 'block', height: '2px', borderRadius: '9999px', backgroundColor: hamColor, width: '100%' }} />
                <span style={{ display: 'block', height: '2px', borderRadius: '9999px', backgroundColor: '#FF8303', width: '75%' }} />
                <span style={{ display: 'block', height: '2px', borderRadius: '9999px', backgroundColor: hamColor, width: '100%' }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DEV ONLY */}
      <div style={{ position: 'fixed', bottom: '16px', left: '16px', zIndex: 50 }}>
        <button
          onClick={() => setUser(user ? null : MOCK_USER)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 500,
            backgroundColor: '#A35709',
            color: '#F0E3CA',
            fontFamily: 'var(--font-body)',
            opacity: 0.7,
            border: 'none',
            cursor: 'pointer',
          }}
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
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 50,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              style={{
                position: 'fixed', right: 0, top: 0, bottom: 0,
                width: '280px', zIndex: 51,
                display: 'flex', flexDirection: 'column',
                backgroundColor: drawerBg,
                borderLeft: `1px solid ${navBorder}`,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${navBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <BookIcon />
                  <span style={{ color: '#FF8303', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>StudyDesk</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: closeCol, fontSize: '14px' }}
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <nav style={{ display: 'flex', flexDirection: 'column', padding: '12px', gap: '4px', flex: 1, overflowY: 'auto' }}>
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
                        style={{
                          display: 'flex', alignItems: 'center',
                          padding: '12px 16px', borderRadius: '12px',
                          fontSize: '14px', textDecoration: 'none',
                          color: isActive ? '#FF8303' : linkColor,
                          backgroundColor: isActive ? 'rgba(255,131,3,0.1)' : 'transparent',
                          fontFamily: 'var(--font-body)',
                          transition: 'all 0.15s',
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Footer */}
              <div style={{ padding: '16px', borderTop: `1px solid ${navBorder}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!user ? (
                  <>
                    <Link href="/login" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '10px', borderRadius: '12px', fontSize: '14px', fontWeight: 500, border: '1.5px solid #FF8303', color: '#FF8303', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                      Login
                    </Link>
                    <Link href="/register" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '10px', borderRadius: '12px', fontSize: '14px', fontWeight: 500, backgroundColor: '#FF8303', color: '#1B1A17', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                      Register
                    </Link>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={user.image} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', outline: '2px solid #FF8303', outlineOffset: '1px', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: profileName, fontFamily: 'var(--font-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
                      <button onClick={() => { setUser(null); setMobileOpen(false) }} style={{ fontSize: '12px', color: '#FF8303', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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

function ChevronIcon({ open, color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color || 'rgba(240,227,202,0.5)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
