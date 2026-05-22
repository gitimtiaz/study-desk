'use client'

import { api } from '@/lib/api'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => {
  const h = 8 + i
  return `${h.toString().padStart(2, '0')}:00`
})

const today = new Date().toISOString().split('T')[0]

export default function BookingModal({ room, onClose }) {
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Reset end time if it becomes invalid after start changes
  useEffect(() => {
    if (startTime && endTime && endTime <= startTime) setEndTime('')
  }, [startTime])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const endSlots = TIME_SLOTS.filter(t => !startTime || t > startTime)

  const totalCost = startTime && endTime
    ? (parseInt(endTime) - parseInt(startTime)) * room.hourlyRate
    : 0

  const validate = () => {
    const e = {}
    if (!date) e.date = 'Please select a date'
    if (!startTime) e.startTime = 'Select a start time'
    if (!endTime) e.endTime = 'Select an end time'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      await api.createBooking({
        roomId: room._id,
        date,
        startTime,
        endTime,
        totalCost,
        note,
      })
      toast.success('Room booked successfully!')
      onClose()
    } catch (err) {
      toast.error(err.message || 'Booking failed. Slot may already be taken.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-base-100 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
            <div>
              <h2 className="font-heading text-base-content text-lg">Book this Room</h2>
              <p className="text-xs text-base-content/50 mt-0.5">{room.name}</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-200 text-base-content/50 transition-colors">
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">Date</label>
              <input type="date" value={date} min={today}
                onChange={(e) => { setDate(e.target.value); setErrors(p => ({ ...p, date: '' })) }}
                className={`w-full px-4 py-2.5 rounded-xl text-sm bg-base-200 border text-base-content outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.date ? 'border-red-400' : 'border-base-300'}`}
              />
              {errors.date && <FieldError msg={errors.date} />}
            </div>

            {/* Start + End time row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-base-content/80">Start Time</label>
                <select value={startTime}
                  onChange={(e) => { setStartTime(e.target.value); setErrors(p => ({ ...p, startTime: '' })) }}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm bg-base-200 border text-base-content outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.startTime ? 'border-red-400' : 'border-base-300'}`}
                >
                  <option value="">Select</option>
                  {TIME_SLOTS.slice(0, -1).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.startTime && <FieldError msg={errors.startTime} />}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-base-content/80">End Time</label>
                <select value={endTime} disabled={!startTime}
                  onChange={(e) => { setEndTime(e.target.value); setErrors(p => ({ ...p, endTime: '' })) }}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm bg-base-200 border text-base-content outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed ${errors.endTime ? 'border-red-400' : 'border-base-300'}`}
                >
                  <option value="">Select</option>
                  {endSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.endTime && <FieldError msg={errors.endTime} />}
              </div>
            </div>

            {/* Live cost */}
            <AnimatePresence>
              {totalCost > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/10 border border-primary/25"
                >
                  <div>
                    <p className="text-xs text-base-content/55">
                      {startTime} → {endTime} &nbsp;·&nbsp; {parseInt(endTime) - parseInt(startTime)} hr{parseInt(endTime) - parseInt(startTime) > 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-base-content/55 mt-0.5">${room.hourlyRate}/hr</p>
                  </div>
                  <p className="font-heading text-primary text-2xl">${totalCost}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Special note */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">
                Special Note <span className="text-base-content/40 font-normal">(optional)</span>
              </label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)}
                rows={2} placeholder="Any specific requirements or notes..."
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-base-200 border border-base-300 text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-base-300 text-base-content/70 hover:bg-base-200 transition-all duration-200">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading && <SpinnerIcon />}
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function FieldError({ msg }) {
  return <p className="text-xs text-red-500 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block shrink-0" />{msg}</p>
}

function SpinnerIcon() {
  return <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
}
