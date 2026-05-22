import Link from 'next/link'

export const metadata = {
  title: 'StudyDesk – Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-100 flex items-center justify-center px-4">
      <div className="text-center">

        {/* Big 404 */}
        <p className="font-heading text-primary font-normal leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 10rem)' }}>
          404
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-primary/30 mx-auto mb-6" />

        <h1 className="font-heading text-base-content text-2xl font-normal mb-3">
          This page took the wrong corridor.
        </h1>
        <p className="text-sm text-base-content/50 max-w-xs mx-auto leading-relaxed mb-8">
          The room you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>

        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200">
          ← Back to Home
        </Link>

      </div>
    </div>
  )
}
