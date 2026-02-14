# Our Story — A Love Timeline

A beautiful, immersive photo timeline for you and your partner. Scroll through your memories together, watch your relationship counter tick every second, and see the world change with the seasons.

## Features

- **Vertical timeline** — Full-screen sections you navigate with keyboard (arrow keys / j-k) or finger swipe on mobile
- **Seasonal backgrounds** — The background gradient shifts between spring, summer, fall, and winter based on each event's date
- **Live dating counter** — Shows years, months, days, hours, minutes, seconds since you started dating, updating every second
- **Events with multiple photos** — Each event has a title, date, and a horizontal photo carousel
- **Full CRUD** — Create events, add/remove photos, edit titles and dates, delete events
- **Responsive** — Designed mobile-first; vertical scroll-snap works great on phones and laptops

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **Vercel Postgres** — event and photo metadata
- **Vercel Blob** — image file storage
- **TypeScript**

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create storage on Vercel

1. Go to your [Vercel project dashboard](https://vercel.com)
2. **Storage → Create Database → Postgres** — this gives you the `POSTGRES_*` env vars
3. **Storage → Create Store → Blob** — this gives you `BLOB_READ_WRITE_TOKEN`

### 3. Configure environment

```bash
cp .env.example .env.local
```

Fill in:
- `POSTGRES_*` variables from your Vercel Postgres database
- `BLOB_READ_WRITE_TOKEN` from your Vercel Blob store
- `NEXT_PUBLIC_DATING_START_DATE` — the date you started dating (YYYY-MM-DD)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Database tables are **automatically created** on the first API request.

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Under **Storage**, add a **Postgres** database and a **Blob** store
4. Add `NEXT_PUBLIC_DATING_START_DATE` to your project's Environment Variables
5. Deploy

## Navigation

| Input | Action |
|-------|--------|
| `↓` / `j` | Next event |
| `↑` / `k` | Previous event |
| `←` / `→` | Previous / next photo in carousel |
| Swipe up/down | Navigate events (mobile) |
| Swipe left/right | Navigate photos (mobile) |
| Click side dots | Jump to any event |

## Customization

- **Start date** — Set `NEXT_PUBLIC_DATING_START_DATE` in `.env.local`
- **Season colors** — Edit `lib/seasons.ts` theme definitions
- **Title** — Edit the hero section in `components/Timeline.tsx`
