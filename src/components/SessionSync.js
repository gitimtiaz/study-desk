'use client'

import { useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { api } from '@/lib/api'

export default function SessionSync() {
  const { data: session } = useSession()
  const email = session?.user?.email

  useEffect(() => {
    if (!session?.user) return
    const { name, email, image } = session.user
    api.syncSession({ name, email, image }).catch(() => {})
    // silent fail — if backend is down, frontend still works
  }, [email])

  return null
}
