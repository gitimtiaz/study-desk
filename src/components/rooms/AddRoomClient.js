'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useSession } from '@/lib/auth-client'

const AMENITIES = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning']

const EMPTY = {
  name: '', description: '', image: '',
  floor: '', capacity: '', hourlyRate: '',
  amenities: [],
}

export default function AddRoomClient() {
  const { data: session, isPending } = useSession()
  const user   = session?.user
  const router = useRouter()

  const [form,     setForm]     = useState(EMPTY)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => { document.title = 'StudyDesk – Add Room' }, [])

  // Private route guard
  useEffect(() => {
    if (!isPending && !user) router.replace('/login')
  }, [isPending, user, router])

  const update = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    setErrors(p => ({ ...p, [field]: '' }))
    if (field === 'image') setImgError(false)
  }

  const toggleAmenity = (a) =>
    setForm(p => ({
      ...p,
      amenities: p.amenities.includes(a)
        ? p.amenities.filter(x => x !== a)
        : [...p.amenities, a],
    }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name        = 'Room name is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.image.trim())       e.image       = 'Image URL is required'
    if (!form.floor.trim())       e.floor       = 'Floor is required'
    if (!form.capacity)           e.capacity    = 'Capacity is required'
    if (!form.hourlyRate)         e.hourlyRate  = 'Hourly rate is required'
    else if (Number(form.hourlyRate) <= 0) e.hourlyRate = 'Rate must be greater than 0'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    toast.success('Room added successfully!')
    router.push('/my-listings')
  }

  // Show nothing while session loads
  if (isPending) return <PageSkeleton />

  return (
    <div className="min-h-screen bg-base-100">

      {/* Page header */}
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,131,3,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            New Listing
          </span>
          <h1 className="font-heading text-cream font-normal"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
            Add a Study Room
          </h1>
          <p className="text-cream/50 text-sm mt-2">
            Fill in the details below to list your space for other students to book.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.form
          onSubmit={handleSubmit} noValidate
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-8"
        >

          {/* Section 1 Room Info */}
          <div className="bg-base-200 rounded-2xl border border-base-300 p-6 flex flex-col gap-5">
            <h2 className="font-heading text-base-content text-lg">Room Information</h2>

            {/* Name */}
            <Field label="Room Name" error={errors.name}>
              <input type="text" value={form.name} onChange={update('name')}
                placeholder="e.g. Silent Focus Pod"
                className={inputClass(errors.name)} />
            </Field>

            {/* Description */}
            <Field label="Description" error={errors.description}>
              <textarea value={form.description} onChange={update('description')} rows={3}
                placeholder="Describe the room — size, vibe, best use case..."
                className={`${inputClass(errors.description)} resize-none`} />
            </Field>

            {/* Image URL + live preview */}
            <Field label="Image URL" error={errors.image}>
              <div className="flex items-center gap-3">
                {/* Preview thumbnail */}
                <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-base-300 border border-base-300 flex items-center justify-center">
                  {form.image && !imgError ? (
                    <img src={form.image} alt="preview"
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)} />
                  ) : (
                    <ImagePlaceholderIcon />
                  )}
                </div>
                <input type="text" value={form.image} onChange={update('image')}
                  placeholder="https://example.com/room.jpg"
                  className={`flex-1 ${inputClass(errors.image)}`} />
              </div>
            </Field>

            {/* Floor + Capacity + Rate row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Floor" error={errors.floor}>
                <input type="text" value={form.floor} onChange={update('floor')}
                  placeholder="e.g. Floor 2"
                  className={inputClass(errors.floor)} />
              </Field>
              <Field label="Capacity (people)" error={errors.capacity}>
                <input type="number" value={form.capacity} onChange={update('capacity')}
                  placeholder="e.g. 4" min={1}
                  className={inputClass(errors.capacity)} />
              </Field>
              <Field label="Hourly Rate ($)" error={errors.hourlyRate}>
                <input type="number" value={form.hourlyRate} onChange={update('hourlyRate')}
                  placeholder="e.g. 5" min={1}
                  className={inputClass(errors.hourlyRate)} />
              </Field>
            </div>
          </div>

          {/* Section 2 Amenities */}
          <div className="bg-base-200 rounded-2xl border border-base-300 p-6 flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-base-content text-lg">Amenities</h2>
              <p className="text-xs text-base-content/50 mt-1">
                Select everything your room offers. Toggle to select.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES.map((a) => {
                const active = form.amenities.includes(a)
                return (
                  <button key={a} type="button" onClick={() => toggleAmenity(a)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 text-left ${
                      active
                        ? 'bg-primary text-dark border-primary shadow-[0_2px_8px_rgba(255,131,3,0.3)]'
                        : 'bg-base-100 text-base-content/65 border-base-300 hover:border-primary/40'
                    }`}>
                    <AmenityIcon name={a} active={active} />
                    {a}
                  </button>
                )
              })}
            </div>
            {form.amenities.length > 0 && (
              <p className="text-xs text-primary">
                {form.amenities.length} amenit{form.amenities.length === 1 ? 'y' : 'ies'} selected
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => router.back()}
              className="px-6 py-3 rounded-xl text-sm font-medium border border-base-300 text-base-content/70 hover:bg-base-200 transition-all duration-200">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-3 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
              {loading && <SpinnerIcon />}
              {loading ? 'Adding Room...' : 'Add Room →'}
            </button>
          </div>

        </motion.form>
      </div>
    </div>
  )
}

// Reusable field wrapper
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-base-content/80">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500 inline-block shrink-0" />{error}
        </p>
      )}
    </div>
  )
}

function inputClass(error) {
  return `w-full px-4 py-2.5 rounded-xl text-sm bg-base-100 border text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${error ? 'border-red-400' : 'border-base-300'}`
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-dark h-32 animate-pulse" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6">
        {[1, 2].map(i => (
          <div key={i} className="h-48 rounded-2xl bg-base-200 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

// Icons
function AmenityIcon({ name, active }) {
  const color = active ? '#1B1A17' : undefined
  const icons = {
    'Whiteboard':    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    'Projector':     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /></svg>,
    'Wi-Fi':         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" /></svg>,
    'Power Outlets': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>,
    'Quiet Zone':    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>,
    'Air Conditioning': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" /></svg>,
  }
  return icons[name] || null
}
function ImagePlaceholderIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-base-content/30"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
}
function SpinnerIcon() {
  return <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
}
