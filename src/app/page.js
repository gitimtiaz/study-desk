import ThemeToggle from '@/components/ui/ThemeToggle'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-base-100 gap-6">

      {/* Theme toggle preview */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <h1
        className="text-5xl text-base-content"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        StudyDesk
      </h1>

      <p
        className="text-primary text-lg tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}
      >
        Gateway to Distraction-Free Focus
      </p>

      <div className="flex gap-3 mt-4 flex-wrap justify-center">
        <span className="badge bg-primary text-dark border-none px-4 py-3">Primary #FF8303</span>
        <span className="badge bg-primary-dark text-cream border-none px-4 py-3">Dark #A35709</span>
        <span className="badge bg-cream text-dark border border-base-300 px-4 py-3">Cream #F0E3CA</span>
        <span className="badge bg-dark text-cream border-none px-4 py-3">Near Black #1B1A17</span>
      </div>

      <p className="text-base-content/50 text-sm mt-2" style={{ fontFamily: 'var(--font-body)' }}>
        Theme toggle test.
      </p>

    </main>
  )
}
