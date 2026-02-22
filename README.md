# AI Learning Dashboard

A mini AI Learning Dashboard built with **Next.js 16** (web) and **React Native / Expo** (mobile).

## Live Demo

> Deployment link: _[Add your Vercel URL here after deploying]_

## Features

- **Login Page** — Email + password form, redirects to dashboard on submit (no auth required)
- **Dashboard** — Course cards with progress bars, search/filter, stat cards, sidebar navigation
- **Course Detail Page** (`/course/:id`) — Full lesson list with toggleable completion checkboxes; progress persists via localStorage and syncs back to the dashboard
- **Dark Mode** — Toggle between light and dark themes (persisted)
- **Loading Skeletons** — Shimmer skeleton placeholders while data loads
- **React Native Screen** — Expo-based mobile dashboard mimicking the web layout

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Web Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19, inline styles with CSS custom properties |
| State | React Hooks (`useState`, `useEffect`, `use`) |
| Persistence | localStorage for progress sync |
| Mobile | React Native + Expo |
| Deployment | Vercel |

## Getting Started

```bash
# Install dependencies
cd web
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Mobile (React Native)

```bash
cd mobile-dashboard
npm install
npx expo start
```

## How AI Tools Were Used

- **GitHub Copilot (Claude)** was used throughout development for:
  - Scaffolding component structure and initial layouts
  - Debugging runtime errors (e.g., Next.js 16 `params` Promise change, missing JSON fields)
  - Implementing localStorage-based progress syncing between pages
  - Writing dark mode theming with CSS custom properties
  - Generating skeleton loading components
- All generated code was reviewed, understood, and adapted to fit the project's architecture.

## Challenges Faced

1. **Next.js 16 breaking change** — `params` is now a `Promise` in page components, which caused "Course not found" errors until resolved with `use()`.
2. **Cross-page state sync** — Course progress toggles on the detail page needed to reflect on the dashboard. Solved via localStorage persistence.
3. **Dark mode theming** — Implementing a consistent dark/light theme across all components using CSS custom properties without a CSS-in-JS library.

## Improvements Possible with More Time

- Backend API with database (e.g., Prisma + PostgreSQL) instead of local JSON
- User authentication with NextAuth or Clerk
- Animated page transitions and micro-interactions
- Course content pages with video/text lessons
- Unit and integration tests (Jest + React Testing Library)
- Responsive design improvements for tablet/mobile web
- PWA support for offline access
