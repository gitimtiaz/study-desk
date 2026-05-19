import { DM_Serif_Display, Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'StudyDesk – Gateway to Distraction-Free Focus',
  description:
    'Browse and book quiet, private study rooms in your library. List your own room and earn.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${dmSerifDisplay.variable} ${inter.variable}`}>
        <ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1B1A17',
                color: '#F0E3CA',
                borderLeft: '4px solid #FF8303',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
