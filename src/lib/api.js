const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include', // sends JWT http-only cookie automatically
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const api = {
  // Auth sync BetterAuth session to backend JWT
  syncSession: (body)      => req('/api/auth/google',  { method: 'POST', body: JSON.stringify(body) }),
  loginEmail:  (body)      => req('/api/auth/login',   { method: 'POST', body: JSON.stringify(body) }),
  registerEmail: (body)    => req('/api/auth/register',{ method: 'POST', body: JSON.stringify(body) }),
  logout:      ()          => req('/api/auth/logout',  { method: 'POST' }),

  // Rooms — public
  getLatestRooms: ()       => req('/api/rooms/latest'),
  getRooms:    (params={}) => req(`/api/rooms?${new URLSearchParams(params)}`),
  getRoom:     (id)        => req(`/api/rooms/${id}`),

  // Rooms — private
  getMyListings: ()        => req('/api/rooms/my-listings'),
  addRoom:     (body)      => req('/api/rooms',         { method: 'POST',   body: JSON.stringify(body) }),
  updateRoom:  (id, body)  => req(`/api/rooms/${id}`,   { method: 'PUT',    body: JSON.stringify(body) }),
  deleteRoom:  (id)        => req(`/api/rooms/${id}`,   { method: 'DELETE' }),

  // Bookings
  createBooking: (body)    => req('/api/bookings',               { method: 'POST',  body: JSON.stringify(body) }),
  getMyBookings: ()        => req('/api/bookings/my-bookings'),
  cancelBooking: (id)      => req(`/api/bookings/${id}/cancel`,  { method: 'PATCH' }),
}
