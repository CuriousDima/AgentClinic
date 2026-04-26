# Tech Stack

## Frontend & Framework

- **Next.js** (App Router) with **React** and **TypeScript**
- Server components for data-heavy pages, client components where interactivity is needed

## Styling

- **Tailwind CSS** — utility-first, easy to keep consistent, no extra build step surprises

## Database

- **SQLite** via the `better-sqlite3` package — no ORM, plain SQL queries
- Single `.db` file stored alongside the app on the server
- Schema created once at init time; no migration management needed
- Schema kept in a `schema.sql` file in the repo for reference and debugging

## Testing

Every feature ships with two mandatory layers — neither is optional:

### Unit & Integration — Vitest
- **Vitest** — fast unit and integration tests, TypeScript-native
- `npm test` runs the suite once (suitable for CI and pre-merge validation)
- `npm run test:watch` runs in watch mode during development
- Covers: data-layer functions, utilities, business logic

### Behavioral — Playwright (via MCP)
- **Playwright MCP** — visual, end-to-end browser validation on every feature
- Validates the full user flow in a real browser: navigation, form submission, data persistence, UI state (e.g. greyed-out cards, redirects)
- Run against the local dev server (`npm run dev`) before marking any feature complete
- Covers: every user-facing flow introduced or changed in the phase

### Rule
A phase is not mergeable until **both** layers pass. Vitest alone is not sufficient.

## Auth

- None for now — all routes are publicly accessible
- Role distinctions (agent vs. therapist vs. receptionist) can be added later without architectural changes

## Running the App

A single command to start everything:

```bash
npm run dev     # development
npm run build && npm start  # production
```

No Docker required. No cloud services. Just Node.js and a SQLite file.

## Deployment

- Self-hosted on any machine with Node.js 18+
- Serve behind a reverse proxy (e.g., nginx or Caddy) for production TLS
