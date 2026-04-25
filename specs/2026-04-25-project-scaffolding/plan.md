# Plan — Phase 0: Project Scaffolding

## Task Group 1 — Next.js App Initialization

1. Remove bare TypeScript stub (`src/index.ts`, old `tsconfig.json`, old `package.json`)
2. Scaffold Next.js 15 with TypeScript, App Router, and Tailwind CSS via `create-next-app`
3. Verify `npm run dev` starts and returns 200 at `localhost:3000`

## Task Group 2 — SQLite Setup & Migrations

4. Install `better-sqlite3` and `better-sqlite3-migrations` (lightweight numbered-file runner)
5. Create `db/migrations/` directory with the first migration (`0001_init.sql`) — empty schema placeholder
6. Create `db/schema.sql` as a human-readable reference snapshot (not executed at runtime)
7. Wire the migration runner into Next.js app startup (via `instrumentation.ts` or a top-level module) so migrations apply before the first request

## Task Group 3 — Layout Shell

8. Create root layout (`app/layout.tsx`) with:
   - `<Header>` — clinic name, tagline
   - `<Nav>` — placeholder links (Agents, Appointments, Dashboard)
   - `<Footer>` — small ironic sign-off
9. Apply "clean/ironic clinic aesthetic" via Tailwind: muted clinical palette, Helvetica (system font stack) used everywhere, subtle waiting-room energy

## Task Group 4 — Placeholder Home Page

10. Create `app/page.tsx` — hero section welcoming agents to the clinic
11. No data fetching; static copy only

## Task Group 5 — Run Script & npm Commands

12. Create `run.sh` shell script that runs `npm run dev` (with a brief usage comment at the top)
13. Confirm `package.json` has both `dev` and `start` scripts (`next dev` / `next build && next start`)
14. `chmod +x run.sh`
