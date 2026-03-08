# Next.js Migration

This project has been migrated to Next.js.

The new Next.js project is located at: ../allwork-noplay-nextjs

## Migration notes
- Node version: 20 (via nvm)
- Next.js version: 16.x (App Router)
- Original framework: Create React App (React 16)
- `qs` replaced with `useSearchParams` from Next.js (query params read via the hook)
- Single page app → `src/app/page.tsx` (server component) + `src/components/App.tsx` (client component)
- CSS from `src/App.css` and `src/index.css` merged into `src/app/globals.css`
- `window.location.search` replaced with `useSearchParams()` hook
