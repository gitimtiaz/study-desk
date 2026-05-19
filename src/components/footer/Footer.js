'use client'

import Link from 'next/link'

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF8303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Rooms', href: '/rooms' },
  { label: 'Add Room', href: '/add-room' },
  { label: 'My Bookings', href: '/my-bookings' },
  { label: 'About', href: '/#about' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: <FacebookIcon /> },
  { label: 'X', href: 'https://x.com', icon: <XIcon /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <LinkedInIcon /> },
  { label: 'Instagram', href: 'https://instagram.com', icon: <InstagramIcon /> },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: '#1B1A17',
        borderTop: '1px solid rgba(163,87,9,0.3)',
      }}
    >
      {/* Main grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '56px 24px',
        }}
      >
        <div className="footer-grid">

          {/* Col-1 Brand */}
          <div>
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', textDecoration: 'none', width: 'fit-content' }}
            >
              <BookIcon />
              <span style={{ color: '#FF8303', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                StudyDesk
              </span>
            </Link>
            <p
              style={{
                color: 'rgba(240,227,202,0.5)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.7,
                marginBottom: '20px',
                maxWidth: '220px',
              }}
            >
              Your gateway to distraction-free focus. Browse, book, and manage private study rooms with ease.
            </p>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '5px',
                backgroundColor: 'rgba(255,131,3,0.1)',
                color: '#FF8303',
                border: '1px solid rgba(255,131,3,0.22)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.04em',
              }}
            >
              Gateway to Distraction-Free Focus
            </span>
          </div>

          {/* Col-2 Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FF8303',
                fontFamily: 'var(--font-body)',
                marginBottom: '20px',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link group"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: 'rgba(240,227,202,0.55)',
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F0E3CA')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,227,202,0.55)')}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '1.5px',
                        backgroundColor: '#FF8303',
                        flexShrink: 0,
                      }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col-3 Contact */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FF8303',
                fontFamily: 'var(--font-body)',
                marginBottom: '20px',
              }}
            >
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <MailIcon />, text: 'hello@studydesk.com', href: 'mailto:hello@studydesk.com' },
                { icon: <PhoneIcon />, text: '+880 1700-000000', href: 'tel:+8801700000000' },
                { icon: <LocationIcon />, text: 'Dhanmondi, Dhaka, Bangladesh', href: null },
              ].map(({ icon, text, href }) => {
                const Wrapper = href ? 'a' : 'p'
                return (
                  <li key={text}>
                    <Wrapper
                      href={href || undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '14px',
                        color: 'rgba(240,227,202,0.55)',
                        fontFamily: 'var(--font-body)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        margin: 0,
                      }}
                      onMouseEnter={href ? (e) => (e.currentTarget.style.color = '#F0E3CA') : undefined}
                      onMouseLeave={href ? (e) => (e.currentTarget.style.color = 'rgba(240,227,202,0.55)') : undefined}
                    >
                      <span style={{ color: '#FF8303', marginTop: '2px', flexShrink: 0 }}>{icon}</span>
                      {text}
                    </Wrapper>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Col-4 Follow Us */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FF8303',
                fontFamily: 'var(--font-body)',
                marginBottom: '20px',
              }}
            >
              Follow Us
            </h4>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(240,227,202,0.45)',
                fontFamily: 'var(--font-body)',
                marginBottom: '20px',
                lineHeight: 1.6,
              }}
            >
              Stay updated with new rooms and community highlights.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,131,3,0.1)',
                    color: 'rgba(240,227,202,0.6)',
                    border: '1px solid rgba(255,131,3,0.15)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8303'
                    e.currentTarget.style.color = '#1B1A17'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,131,3,0.1)'
                    e.currentTarget.style.color = 'rgba(240,227,202,0.6)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(163,87,9,0.2)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '18px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(240,227,202,0.32)', fontFamily: 'var(--font-body)', margin: 0 }}>
            © {year} StudyDesk. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(240,227,202,0.22)', fontFamily: 'var(--font-body)', margin: 0 }}>
            Built with focus, designed for learners.
          </p>
        </div>
      </div>
    </footer>
  )
}
