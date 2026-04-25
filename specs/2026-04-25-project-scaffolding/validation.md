# Validation — Phase 0: Project Scaffolding

## Definition of Done

This phase is mergeable when all of the following pass.

## Checklist

### Server Startup

- [ ] `npm run dev` starts without errors or warnings that block rendering
- [ ] `npm run build && npm start` completes and serves the app
- [ ] `./run.sh` starts the dev server (script is executable and works end-to-end)

### Database

- [ ] A SQLite `.db` file is created on first startup (not committed to git)
- [ ] The migrations runner applies `0001_init.sql` on startup without errors
- [ ] Re-running the server does not re-apply already-applied migrations (idempotent)
- [ ] `db/schema.sql` exists in the repo as a reference file

### Landing Page

- [ ] `localhost:3000` returns HTTP 200
- [ ] The page renders a header, navigation bar, and footer
- [ ] The page renders a hero/welcome section with clinic-themed copy
- [ ] No React hydration errors in the browser console
- [ ] The visual style matches the "clean/ironic clinic aesthetic": muted palette, appropriate typography, no broken layout

### Code Quality

- [ ] `npx tsc --noEmit` passes with no type errors
- [ ] No `any` types introduced without justification
- [ ] `.db` file and `.next/` build output are in `.gitignore`

## Smoke Test (manual)

1. Clone the repo to a fresh directory
2. Run `npm install`
3. Run `./run.sh`
4. Open `http://localhost:3000` in a browser
5. Confirm the landing page renders with header, nav, content, and footer
6. Check the browser console — no errors
7. Stop the server and restart it — confirm migrations do not error on second run
