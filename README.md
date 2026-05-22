# StudyDesk

> **Gateway to Distraction-Free Focus.**

A full-stack study room booking platform where students and library users can list private study rooms they control, and any registered user can browse, search, filter, and book those rooms for a specific date and time slot. The platform automatically prevents double-booking using time-conflict detection, allows room owners to manage their listings, and gives every user a personal dashboard to handle their bookings.

## 🔗 Links

### Live Links:

- **Live URL (Server):** [studydesk-server.onrender.com](https://studydesk-server.onrender.com)
- **Live URL (Client):** [study-desk-neon.vercel.app](https://study-desk-neon.vercel.app/)

### Git Repositories

- **GitHub (Client):** [github.com/gitimtiaz/study-desk](https://github.com/gitimtiaz/study-desk)
- **GitHub (Server):** [github.com/gitimtiaz/studydesk-server](https://github.com/gitimtiaz/studydesk-server)

---

## ✨ Key Features

- Browse all available study rooms with real-time search by name and amenity filter checkboxes
- Book any room by selecting date, start time, and end time — total cost auto-calculates live
- Smart conflict detection prevents double-bookings using `$gte` / `$lte` MongoDB operators
- Room owners can add, edit, and delete their own listings with full ownership verification on the server
- My Bookings dashboard shows all bookings with status badges and a cancel flow with confirmation modal
- Protected private routes (Add Room, My Listings, My Bookings, Book Now) — redirects to login if unauthenticated
- Secure JWT authentication stored in HTTP-only cookies, verified via `authMiddleware` on every private API route
- Google OAuth and email/password login via BetterAuth
- Skeleton loaders on all data-fetching pages for a polished loading experience
- Fully responsive across mobile, tablet, and desktop with a mobile drawer navigation
- Dark/light theme toggle persisted via context, with a warm cream and orange brand palette

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| Animations | Framer Motion |
| Toasts | React Hot Toast |
| Authentication | BetterAuth + JWT HTTP-only cookies |
| Database | MongoDB Atlas (Mongoose) |
| Frontend Host | Vercel |
| Backend Host | Render |

---

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework with App Router |
| `react` | UI library |
| `tailwindcss` | Utility-first CSS framework |
| `daisyui` | Component library for Tailwind |
| `framer-motion` | Page transitions and card animations |
| `react-hot-toast` | Toast notification system |
| `better-auth` | Authentication — email/password + Google OAuth |
| `mongoose` | MongoDB ODM for rooms, bookings, users |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- A MongoDB Atlas cluster
- Google OAuth credentials

### Installation

```bash
git clone https://github.com/gitimtiaz/study-desk.git
cd study-desk
npm install
```

### Environment Setup

Create `.env.local` in the root:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-random-secret-min-32-chars
MONGODB_URI=your-mongodb-atlas-connection-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...all]/         # BetterAuth route handler
│   │   ├── rooms/
│   │   │   ├── route.js          # GET all rooms (search + filter), POST add room
│   │   │   └── [id]/
│   │   │       └── route.js      # GET, PUT, DELETE single room
│   │   └── bookings/
│   │       ├── route.js          # GET my bookings, POST create booking
│   │       └── [id]/
│   │           └── cancel/
│   │               └── route.js  # PATCH cancel booking
│   ├── rooms/
│   │   ├── [id]/                 # Room details + booking modal
│   │   └── page.js               # All rooms — search & amenity filter
│   ├── add-room/                 # Add room form (private)
│   ├── my-listings/              # Owner's listed rooms (private)
│   ├── my-bookings/              # User's bookings dashboard (private)
│   ├── login/                    # Login page
│   ├── register/                 # Register page
│   ├── layout.js                 # Root layout — Navbar, Footer, Toaster
│   └── not-found.js              # Custom 404 page
├── components/
│   ├── home/                     # Hero, StatsStrip, RoomsSection, HowItWorks, WhyStudyDesk
│   ├── rooms/                    # RoomCard, RoomGrid, FilterBar
│   ├── navbar/                   # Navbar (public + private state, mobile drawer)
│   ├── footer/                   # Footer
│   └── ui/                       # ThemeToggle, SkeletonCard, BookingModal, ConfirmModal
├── context/
│   ├── AuthContext.js            # useAuth() hook wrapping BetterAuth session
│   └── ThemeContext.js           # Dark/light theme toggle context
└── lib/
    ├── auth.js                   # BetterAuth server config (MongoDB adapter)
    ├── auth-client.js            # BetterAuth client — signIn, signUp, signOut
    ├── db.js                     # Mongoose connection helper
    └── middleware.js             # JWT HTTP-only cookie authMiddleware
```

---

## 🎨 Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary Accent | `#FF8303` | Buttons, badges, highlights, CTAs |
| Secondary Dark | `#A35709` | Hover states, section accents, icons |
| Cream | `#F0E3CA` | Page background, card background, light sections |
| Near Black | `#1B1A17` | Navbar, footer, headings, dark sections |

---

## 🔐 Authentication

Authentication is handled by **BetterAuth** with a **MongoDB Atlas** database. Supported methods:

- Email & password registration and login
- Google OAuth (one-click sign-in)

On every successful login, a **JWT is signed and stored in an HTTP-only cookie** (`httpOnly: true`, `secure: true` in production). All private API routes are protected by `authMiddleware`, which reads and verifies the token from `req.cookies.token` and attaches `req.user = { id: userId }`. Logout clears the cookie via `res.clearCookie('token')`.

Protected client routes (Add Room, My Listings, My Bookings, Book Now action) redirect to `/login` when unauthenticated and return the user to their intended page after login.

---

## 📅 Booking & Conflict Detection

Bookings are stored in a `bookings` collection. When a user submits a booking, the server runs a conflict check using MongoDB's `$gte` / `$lte` operators to detect any overlapping confirmed booking for the same room and time range. If a conflict exists, an error is returned inline — no `alert()` used anywhere. On cancellation, the booking status is updated to `cancelled` and the booking ID is removed from the user's bookings array via `$pull`.

---

*© 2026 StudyDesk. Built by [Imtiaz](https://github.com/gitimtiaz)*
