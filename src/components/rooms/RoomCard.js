import Link from 'next/link'

const MAX_CHIPS = 3

export default function RoomCard({ room }) {
  const { _id, name, description, image, floor, capacity, hourlyRate, amenities = [] } = room

  const visibleAmenities = amenities.slice(0, MAX_CHIPS)
  const extraCount = amenities.length - MAX_CHIPS

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-base-100 border border-base-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">

      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #A35709, #FF8303)' }}>
            <RoomPlaceholderIcon />
          </div>
        )}
        {/* Rate badge */}
        <span className="absolute top-3 right-3 bg-dark text-primary text-xs font-bold px-2.5 py-1 rounded-full">
          ${hourlyRate}/hr
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Name + floor */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base-content text-lg leading-snug line-clamp-1">{name}</h3>
          <span className="shrink-0 text-xs px-2.5 py-0.5 rounded-full bg-primary-dark text-cream font-medium">
            {floor}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/55 line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* Capacity row */}
        <div className="flex items-center gap-1.5 text-sm text-base-content/60">
          <PeopleIcon />
          <span>{capacity} people</span>
        </div>

        {/* Amenity chips */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleAmenities.map((a) => (
              <span key={a}
                className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {a}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-base-200 text-base-content/50 border border-base-300">
                +{extraCount} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/rooms/${_id}`}
          className="mt-auto block w-full text-center py-2.5 rounded-xl text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-dark transition-all duration-200"
        >
          View Details →
        </Link>

      </div>
    </div>
  )
}

function PeopleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function RoomPlaceholderIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(240,227,202,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
