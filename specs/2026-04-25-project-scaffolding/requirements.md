# Requirements — Phase 0: Project Scaffolding

## Scope

This phase replaces the bare TypeScript stub with a fully runnable Next.js application shell. No business logic, no real data models — just the bones everything else will build on.

## Technology Decisions

| Concern | Decision | Rationale |
|---|---|---|
| Framework | Next.js 15 (latest stable), App Router | Per tech stack; App Router is the current default |
| Language | TypeScript (strict) | Per tech stack |
| Styling | Tailwind CSS | Per tech stack; no extra build steps |
| Database driver | `better-sqlite3` | Per tech stack; synchronous, no ORM |
| Migration runner | `better-sqlite3-migrations` | Lightweight, supports numbered `.sql` files, no config overhead |
| Auth | None | Explicitly deferred per tech stack doc |

## Migration Strategy

- Migrations live in `db/migrations/` as numbered SQL files (`0001_init.sql`, `0002_...sql`, …)
- The runner applies any unapplied migrations at app startup, tracked via an internal `migrations` table in SQLite
- `db/schema.sql` is a hand-maintained snapshot for reference and debugging — it is not executed

## Design Direction

"Clean/ironic clinic aesthetic":
- Muted, clinical color palette (off-whites, cool grays, a single muted accent — think waiting room, not ER)
- Typography: a readable sans-serif for body, monospace accents for anything code/agent-flavored
- Tone: professional surface, absurdist subtext — the copy takes the premise seriously; the premise does not take itself seriously
- No heavy UI libraries; Tailwind utility classes only

## Out of Scope for This Phase

- Any database tables beyond the migrations tracker
- Authentication or role distinctions
- Real navigation targets (nav links are placeholders)
- Responsive/mobile polish (Phase 6)
- Error boundaries, loading states (Phase 6)

## Context

Starting state: a `package.json` with only `typescript` as a dev dependency and a `src/index.ts` stub. Everything needs to be bootstrapped from scratch.
