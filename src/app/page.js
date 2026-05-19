export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-32 bg-base-100 gap-4 px-4">
      <h1
        className="text-5xl text-base-content text-center"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        StudyDesk
      </h1>
      <p
        className="text-lg tracking-widest uppercase text-center"
        style={{ color: '#FF8303', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
      >
        Gateway to Distraction-Free Focus
      </p>
      <p
        className="text-sm mt-2 opacity-50 text-base-content text-center"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Navbar & Footer Done.
      </p>
    </main>
  )
}
