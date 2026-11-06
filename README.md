# KarigarConnect

KarigarConnect is a frontend prototype for discovering artisan profiles and following community support for their funding requests.

## Features

- Browse and search artisan profiles by name, location, and craft.
- View artisan-provided profile details and funding progress.
- Register profiles with a short story draft based only on the entered details.
- Switch between English and Hindi; the selected language is saved in the browser.
- Optionally connect Supabase to load and save artisan profiles.
- Sign in or create an account through Supabase Auth when a project is connected.

This prototype does not process payments or repayments; support actions update displayed funding totals only. Without a database connection, profiles and support added during a session are not saved after refresh. No sample artisan records are included.

Account registration and sign-in require a configured Supabase project with Email authentication enabled. Supabase email-confirmation settings may require the user to confirm an address before signing in. Artisan profile creation and funding-total updates also require the Supabase `artisans` table and appropriate Row Level Security policies for the project's public/client key. Authentication alone does not grant permission to modify artisan records. No separate login page or client-side routes are currently part of this single-page frontend.

## Run locally

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Supabase setup

Run [`src/data/schema.sql`](src/data/schema.sql) in the Supabase SQL Editor, then enter the project URL and publishable/anon key in Database Settings. Never use a service-role or secret key in the browser.

## Technology

- React and Vite
- Tailwind CSS
- Supabase JavaScript client
- Lucide React icons
- Canvas Confetti
