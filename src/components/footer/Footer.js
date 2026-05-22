'use client'

import Link from 'next/link'

// Social icon 
const quickLinks = [
  { label: 'Home',        href: '/' },
  { label: 'All Rooms',   href: '/rooms' },
  { label: 'Add Room',    href: '/add-room' },
  { label: 'My Bookings', href: '/my-bookings' },
  { label: 'About',       href: '/#about' },
]

const socialLinks = [
  { label: 'Facebook',  href: 'https://facebook.com', icon: <FacebookIcon /> },
  { label: 'X',         href: 'https://x.com',        icon: <XIcon /> },
  { label: 'LinkedIn',  href: 'https://linkedin.com',  icon: <LinkedInIcon /> },
  { label: 'Instagram', href: 'https://instagram.com', icon: <InstagramIcon /> },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-base-200 border-t border-primary/30">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col-1 Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 w-fit">
              <BookIcon />
              <span className="text-xl font-heading text-primary">StudyDesk</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-dark/45 dark:text-cream/50 max-w-[220px]">
              Your gateway to distraction-free focus. Browse, book, and manage private study rooms with ease.
            </p>
            <span className="inline-block text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/25 tracking-[0.04em]">
              Gateway to Distraction-Free Focus
            </span>
          </div>

          {/* Col-2 Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="group flex items-center gap-2 text-sm text-dark/45 hover:text-dark dark:text-cream/55 hover:text-cream transition-colors duration-200">
                    <span className="inline-block w-3 h-px bg-primary transition-all duration-200 group-hover:w-5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col-3 Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-5">Contact</h4>
            <ul className="flex flex-col gap-4">
              {[
                { icon: <MailIcon />,     text: 'hello@studydesk.com',          href: 'mailto:hello@studydesk.com' },
                { icon: <PhoneIcon />,    text: '+880 1700-000000',              href: 'tel:+8801700000000' },
                { icon: <LocationIcon />, text: 'Dhanmondi, Dhaka, Bangladesh',  href: null },
              ].map(({ icon, text, href }) => {
                const Tag = href ? 'a' : 'p'
                return (
                  <li key={text}>
                    <Tag href={href || undefined}
                      className="flex items-start gap-3 text-sm text-dark/45 hover:text-dark dark:text-cream/55 hover:text-cream transition-colors duration-200">
                      <span className="mt-0.5 shrink-0 text-primary">{icon}</span>
                      {text}
                    </Tag>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Col-4 Follow Us */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-5">Follow Us</h4>
            <p className="text-sm text-dark/45 dark:text-cream/45 mb-5 leading-relaxed">
              Stay updated with new rooms and community highlights.
            </p>
            <div className="flex items-center gap-2.5 flex-wrap">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10 text-dark/50 dark:text-cream/60 border border-primary/15
                  
                  hover:bg-primary 
                  hover:text-dark 
                  dark:hover:text-cream
                  hover:-translate-y-0.5 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-dark/45 dark:text-cream/35">© {year} StudyDesk. All rights reserved.</p>
          <p className="text-xs text-dark/45 dark:text-cream/25">Built with focus, designed for learners.</p>
        </div>
      </div>

    </footer>
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
function FacebookIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
}
function XIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
}
function LinkedInIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
}
function InstagramIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
}
function MailIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
}
function PhoneIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" /></svg>
}
function LocationIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
}
