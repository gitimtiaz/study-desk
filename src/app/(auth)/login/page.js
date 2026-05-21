'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn } from '@/lib/auth-client'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  useEffect(() => { document.title = 'StudyDesk – Login' }, [])

  const validate = () => {
    const e = {}
    if (!email)                            e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'Enter a valid email address'
    if (!password)                         e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: '/',
    })

    setLoading(false)

    if (error) {
      toast.error(error.message || 'Invalid email or password')
      return
    }

    router.push('/')
    router.refresh()
  }

  const handleGoogle = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: '/',
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-dark relative overflow-hidden p-14">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #F0E3CA 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(163,87,9,0.22) 0%, transparent 70%)' }} />

        <div className="flex items-center gap-3 relative z-10">
          <BookIcon />
          <span className="font-heading text-primary text-xl">StudyDesk</span>
        </div>

        <div className="relative z-10">
          <span className="block font-heading text-primary/30 leading-none select-none" style={{ fontSize: '7rem' }}>"</span>
          <blockquote className="font-heading text-cream/90 leading-snug -mt-6"
            style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}>
            The room is booked.<br />The focus begins.
          </blockquote>
          <p className="text-cream/35 text-sm mt-4 tracking-widest uppercase">— StudyDesk</p>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          {['Real-time conflict detection', 'JWT secured with HTTP-only cookies', 'Instant booking confirmation'].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-cream/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{f}
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-base-100 px-6 py-12">
        <div className="w-full max-w-[400px]">

          <div className="mb-8">
            <h1 className="font-heading text-base-content font-normal mb-2"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
              Welcome back
            </h1>
            <p className="text-sm text-base-content/55">Sign in to your account to continue booking.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">Email address</label>
              <input type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl text-sm bg-base-200 border text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-400' : 'border-base-300'}`}
              />
              {errors.email && <FieldError msg={errors.email} />}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-base-content/80">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl text-sm bg-base-200 border text-base-content placeholder:text-base-content/35 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-red-400' : 'border-base-300'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors">
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <FieldError msg={errors.password} />}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-primary text-dark hover:bg-primary-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1">
              {loading && <SpinnerIcon />}
              {loading ? 'Signing in...' : 'Login'}
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

          <p className="text-center text-sm text-base-content/55 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:text-primary-dark transition-colors">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function FieldError({ msg }) {
  return (
    <p className="text-xs text-red-500 flex items-center gap-1">
      <span className="w-1 h-1 rounded-full bg-red-500 inline-block shrink-0 mt-0.5" />{msg}
    </p>
  )
}
function BookIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
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
