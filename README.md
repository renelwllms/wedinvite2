# Premium Wedding Invitation Template

A reusable single-page wedding invitation built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, dayjs, lucide-react, and react-hook-form + zod.

## Features

- Full-screen opening cover with guest personalization via `/invite?to=Guest%20Name`
- Elegant hero, couple, countdown, events, gallery, story, RSVP, gift, and closing sections
- Background music that only starts after user interaction
- Mock RSVP and wishes persistence through a swappable data layer
- SEO metadata, Open Graph image, canonical URL, and favicon support
- Data-driven setup from a single content source in `data/invitation.ts`

## Project Structure

```txt
app/
  invite/page.tsx
components/invitation/
data/invitation.ts
lib/
public/images
public/audio
```

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/invite?to=Renel%20William](http://localhost:3000/invite?to=Renel%20William)

## Customization

- Update couple details, dates, events, gallery assets, gifts, and SEO in `data/invitation.ts`
- Replace placeholder SVGs in `public/images/`
- Add your licensed music file in `public/audio/` and update `music.src`
- Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for correct canonical and OG URLs

## RSVP Backend Upgrade

The current RSVP flow uses a mock storage abstraction in `lib/rsvp-store.ts`. To switch to Supabase, Firebase, or route handlers:

1. Keep the UI contract in `components/invitation/RSVPSection.tsx`
2. Replace `createMockRSVPStore` with a real implementation
3. Wire backend credentials through `.env.local` using `.env.example`

## Notes

- Placeholder assets are included so the template renders immediately.
- The default music path is intentionally a placeholder and should be replaced before production use.
