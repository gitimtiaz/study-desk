'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn, signUp } from '@/lib/auth-client'

function getStrength(pass) {
  if (!pass) return { score: 0, label: '', color: '' }
  let score = 0
  if (pass.length >= 6)   score++
  if (pass.length >= 10)  score++
  if (/[A-Z]/.test(pass)) score++
  if (/[a-z]/.test(pass)) score++
  const c = Math.min(score, 4)
  const map = [
    { label: '',       color: '' },
    { label: 'Weak',   color: 'bg-red-500' },
    { label: 'Fair',   color: 'bg-orange-400' },
    { label: 'Good',   color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-green-500' },
  ]
  return { score: c, ...map[c] }
}

export default function RegisterPage() {
  const [form,     setForm]     = useState({ name: '', email: '', photoURL: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [imgError, setImgError] = useState(false)
  const router   = useRouter()
  const strength = getStrength(form.password)

  useEffect(() => { document.title = 'StudyDesk – Register' }, [])

  const update = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    setErrors(p => ({ ...p, [field]: '' }))
    if (field === 'photoURL') setImgError(false)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())                     e.name     = 'Name is required'
    if (!form.email)                           e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email   = 'Enter a valid email address'
    if (!form.photoURL.trim())                 e.photoURL = 'Photo URL is required'
    if (!form.password)                        e.password = 'Password is required'
    else if (form.password.length < 6)         e.password = 'Password must be at least 6 characters'
    else if (!/[A-Z]/.test(form.password))     e.password = 'Password must contain at least one uppercase letter'
    else if (!/[a-z]/.test(form.password))     e.password = 'Password must contain at least one lowercase letter'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    const { error } = await signUp.email({
      name:  form.name,
      email: form.email,
      password: form.password,
      image: form.photoURL,
      callbackURL: '/login',
    })

    setLoading(false)

    if (error) {
      toast.error(error.message || 'Registration failed. Please try again.')
      return
    }

    toast.success('Registration successful! Please login.')
    router.push('/login')
  }

  const handleGoogle = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: '/',
    })
  }

  const requirements = [
    { label: 'At least 6 characters',  met: form.password.length >= 6 },
    { label: 'One uppercase letter',    met: /[A-Z]/.test(form.password) },
    { label: 'One lowercase letter',    met: /[a-z]/.test(form.password) },
  ]

  return (
    <div className="flex min-h-[calc(100vh-64px)]">

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-dark relative overflow-hidden p-14">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #F0E3CA 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,131,3,0.12) 0%, transparent 70%)' }} />

        <div className="flex items-center gap-3 relative z-10">
          <BookIcon />
          <span className="font-heading text-primary text-xl">StudyDesk</span>
        </div>

        <div className="relative z-10">
          <span className="block font-heading text-primary/30 leading-none select-none" style={{ fontSize: '7rem' }}>"</span>
          <blockquote className="font-heading text-cream/90 leading-snug -mt-6"
            style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)' }}>
            Every great study session<br />starts with the right space.
          </blockquote>
          <p className="text-cream/35 text-sm mt-4 tracking-widest uppercase">— StudyDesk</p>
        </div>

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.15em] text-primary/60 mb-4">What you get</p>
          <div className="flex flex-col gap-3">
            {['Access to 50+ private study rooms', 'Real-time conflict-free booking', 'Your own room listings dashboard', 'Secure account with JWT auth'].map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-cream/50">
                <CheckIcon />{f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-base-100 px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-[420px]">

          <div className="mb-7">
            <h1 className="font-heading text-base-content font-normal mb-2"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
              Create your account
            </h1>
            <p className="text-sm text-base-content/55">Join StudyDesk and start booking in minutes.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">Full name</label>
              <input type="text" value={form.name} onChange={update('name')} placeholder="Imtiaz Ahmed"
                className={`w-full px-4 py-3 rounded-xl text-sm bg-base-200 border text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-red-400' : 'border-base-300'}`}
              />
              {errors.name && <FieldError msg={errors.name} />}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">Email address</label>
              <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl text-sm bg-base-200 border text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-400' : 'border-base-300'}`}
              />
              {errors.email && <FieldError msg={errors.email} />}
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">Photo URL</label>
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-base-300 border-2 border-primary/30 flex items-center justify-center">
                  {form.photoURL && !imgError ? (
                    <img src={form.photoURL} alt="preview" className="w-full h-full object-cover" onError={() => setImgError(true)} />
                  ) : (
                    <PersonIcon />
                  )}
                </div>
                <input type="text" value={form.photoURL} onChange={update('photoURL')} placeholder="https://example.com/photo.jpg"
                  className={`flex-1 px-4 py-3 rounded-xl text-sm bg-base-200 border text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.photoURL ? 'border-red-400' : 'border-base-300'}`}
                />
              </div>
              {errors.photoURL && <FieldError msg={errors.photoURL} />}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={update('password')} placeholder="Create a strong password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl text-sm bg-base-200 border text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-red-400' : 'border-base-300'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors">
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {form.password && (
                <>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.score >= i ? strength.color : 'bg-base-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-base-content/50">
                    Strength:{' '}
                    <span className={`font-medium ${strength.score === 1 ? 'text-red-500' : strength.score === 2 ? 'text-orange-400' : strength.score === 3 ? 'text-yellow-500' : strength.score === 4 ? 'text-green-500' : ''}`}>
                      {strength.label}
                    </span>
                  </p>
                  <div className="flex flex-col gap-1 mt-0.5">
                    {requirements.map((r) => (
                      <div key={r.label} className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${r.met ? 'text-green-500' : 'text-base-content/40'}`}>
                        {r.met ? <CheckCircleIcon /> : <DotCircleIcon />}{r.label}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {errors.password && <FieldError msg={errors.password} />}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1">
              {loading && <SpinnerIcon />}
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-base-300" />
            <span className="text-xs text-base-content/40 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-base-300" />
          </div>

          <button type="button" onClick={handleGoogle}
            className="w-full py-3 rounded-xl text-sm font-medium border border-base-300 text-base-content bg-base-100 hover:bg-base-200 hover:border-primary/40 transition-all duration-200 flex items-center justify-center gap-3">
            <GoogleIcon /> Continue with Google
          </button>

          <p className="text-center text-sm text-base-content/55 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:text-primary-dark transition-colors">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function FieldError({ msg }) {
  return <p className="text-xs text-red-500 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block shrink-0 mt-0.5" />{msg}</p>
}
function BookIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
}
function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF8303" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
}
function CheckCircleIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
}
function DotCircleIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
}
function PersonIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-base-content/30"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
}
function EyeIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
}
function EyeOffIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
}
function SpinnerIcon() {
  return <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
}
function GoogleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
}
