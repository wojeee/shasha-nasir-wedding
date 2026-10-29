# Shasha & Nasir Wedding Website

A single-page wedding invitation built with **Next.js**, **TypeScript**, and **Tailwind CSS**, designed for **Vercel**. RSVPs and guest wishes sync to **Google Sheets** via a Google Apps Script web app.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without `GOOGLE_SCRIPT_URL`, RSVP submissions are accepted in development (logged to the console) and the wishes carousel uses seed messages from `lib/wedding.ts`.

## Content & assets

Edit placeholder copy in [`lib/wedding.ts`](lib/wedding.ts).

When ready, drop media here:

| Asset | Path |
|-------|------|
| Hero loop video | `public/video/hero.mp4` |
| Hero poster (optional) | `public/images/hero-poster.svg` (replace with JPG/PNG) |
| About portraits | Update `AboutSection` to use real images under `public/images/` |

After adding `hero.mp4`, remove `hidden` from the `<video>` in [`components/VideoHero.tsx`](components/VideoHero.tsx) (or swap the gradient placeholder for the video).

## Google Sheets + Apps Script

### 1. Create the sheet

Create a Google Sheet named e.g. **Shasha Nasir RSVPs** with this header row:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Guest Name | Contact | Plus One | Plus One Name | Wishes | Display Wish |

### 2. Install the script

1. In the sheet: **Extensions → Apps Script**
2. Paste the contents of [`apps-script/Code.gs`](apps-script/Code.gs)
3. Save the project

### 3. Deploy as a web app

1. **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Deploy and copy the web app URL

### 4. Connect the site

Locally:

```bash
# .env.local
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

On Vercel: **Project → Settings → Environment Variables** → add `GOOGLE_SCRIPT_URL` for Production (and Preview if desired), then redeploy.

### Moderating wishes

New RSVPs with a wish set `Display Wish` to `TRUE`. Set a row to `FALSE` in the sheet to hide it from the carousel without deleting the RSVP.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add `GOOGLE_SCRIPT_URL`
4. Deploy

Or from the CLI:

```bash
npx vercel
```

## Colour palette

| Name | Hex |
|------|-----|
| Deep Taupe | `#54422C` |
| Warm Beige | `#B58D62` |
| Soft Gold | `#CAA67C` |
| Champagne | `#F6E4CC` |
| Pure White | `#FFFFFF` |
