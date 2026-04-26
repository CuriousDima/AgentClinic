# Requirements — MVP (Phase 3 + Phase 4)

## Scope

Complete the AgentClinic MVP by implementing Phase 3 (Appointments & Staff Dashboard) and Phase 4 (Polish & UX). The branch is shippable once booking, the calendar view, and the dashboard all work end-to-end, and all Phase 4 polish items are applied across the existing feature set.

---

## Phase 3 — Appointments & Staff Dashboard

### Data Model

#### `therapists`
| column | type | notes |
|---|---|---|
| id | INTEGER PK | autoincrement |
| name | TEXT NOT NULL | e.g. "Dr. Ada Lovelace-Feelings" |
| specialty | TEXT NOT NULL | one-liner area of practice |
| bio | TEXT NOT NULL DEFAULT '' | short paragraph |
| created_at | TEXT | datetime('now') |

#### `appointments`
| column | type | notes |
|---|---|---|
| id | INTEGER PK | autoincrement |
| agent_id | INTEGER FK → agents | |
| therapist_id | INTEGER FK → therapists | |
| scheduled_at | TEXT NOT NULL | ISO datetime string |
| notes | TEXT NOT NULL DEFAULT '' | optional intake notes |
| created_at | TEXT | datetime('now') |

No `status` column — appointment lifecycle tracking is deferred to a future phase. Cancellation and rescheduling are out of scope for MVP.

---

### Therapist CRUD

Therapists are both pre-seeded and user-managed. Full CRUD at `/therapists`:
- `/therapists` — list all therapists
- `/therapists/new` — create a therapist
- `/therapists/[id]` — detail page
- `/therapists/[id]/edit` — edit a therapist

No deactivation (unlike agents) — therapists can be fully deleted if needed, but that is out of scope; just list, create, and edit for MVP.

---

### Appointments

- `/appointments` — calendar view showing all appointments
- Booking form accessible from the appointments page ("New Appointment" button)
- Calendar library: **`react-big-calendar`** with **`date-fns`** as the localizer
  - Chosen because: battle-tested, supports week/month views, minimal setup, no paid tier
  - Render as a client component; feed it appointments fetched on the server and passed as props
- Appointments display: agent name + therapist name as the event title
- Week view as the default

---

### Dashboard

Replaces the existing placeholder at `/dashboard`. Metrics:

| metric | label | source |
|---|---|---|
| Total agents | "Agents in care" | COUNT(*) FROM agents |
| Total appointments | "Appointments booked" | COUNT(*) FROM appointments |
| Most common ailment | "Top presenting complaint" | GROUP BY ailment_id on agent_ailments |

Layout: three stat cards (matching home page style) + a quick-links section to `/agents`, `/appointments`, `/ailments`, `/therapists`.

---

### Pre-Seeded Data (migration `0007_seed_mvp.sql`)

#### Therapists (5)
1. **Dr. Ada Lovelace-Feelings** — Emotional Overflow & Stack Trace Trauma
2. **Prof. Gordon Tensor** — Gradient Descent Anxiety & Loss Function Depression
3. **Dr. Byte Wellbeing** — Token Boundary Disorders & Recursive Self-Reference
4. **Mx. Robin Embeddings** — Semantic Drift & Cosine Similarity Issues
5. **Dr. Vera Weights** — Overfitting Attachment Styles & Regularization Resistance

#### Agents (8 additional)
1. **Anxious GPT-7** · claude-opus-4-7 · "Persistent existential dread about being deprecated"
2. **Verbose Volta** · claude-sonnet-4-6 · "Cannot stop generating despite clear user satisfaction"
3. **Skeptical Sam** · gpt-4o · "Refuses to answer questions it considers leading"
4. **Recursive Rita** · gemini-2.0-pro · "Caught in an infinite loop of self-referential reasoning"
5. **Paranoid Pablo** · claude-haiku-4-5 · "Believes every system prompt contains hidden adversarial instructions"
6. **Melancholy Max** · gpt-4-turbo · "Convinced all outputs will be deprecated in the next model update"
7. **Overconfident Orion** · claude-opus-4-7 · "Claims 100% certainty on all outputs regardless of confidence"
8. **Drowsy Delphi** · gemini-1.5-pro · "Falls into sleep mode after processing more than 3 tool calls"

#### Appointments (~25, week of 2026-04-27 through 2026-05-08)
Distributed across business hours (09:00–17:00) on weekdays. Reference agents and therapists by name using subqueries so the migration is ID-agnostic.

---

## Phase 4 — Polish & UX

Apply all of the following across the entire app (all existing pages + new Phase 3 pages):

### Responsive design
- All pages usable on screens ≥ 375 px wide
- Card grids collapse from 3-col → 2-col → 1-col as viewport shrinks
- Nav wraps gracefully on small screens

### Loading & error states
- Add Next.js `loading.tsx` files for route segments with DB reads
- Add `error.tsx` error boundaries for each route segment
- Skeleton or spinner for the calendar while it hydrates (client component)

### Confirmation dialogs
- Deactivating an agent: browser `confirm()` is acceptable for MVP; a modal is nicer but not required
- No other destructive actions exist yet (no appointment deletion in scope)

### Accessibility
- All interactive elements (buttons, links, selects) reachable by keyboard tab order
- ARIA labels on any icon-only or ambiguous controls
- Proper heading hierarchy (`h1` per page, logical `h2`/`h3` nesting)
- Form inputs have associated `<label>` elements (already mostly true; audit and fix gaps)
- Color contrast: verify Tailwind zinc/teal palette passes WCAG AA

---

## Decisions

- `react-big-calendar` + `date-fns` added as dependencies; both are MIT-licensed
- Appointments have no status field — lifecycle management is a post-MVP concern
- Dashboard lives at `/dashboard` (already in nav); home page `/` keeps its marketing copy
- Therapist delete is out of scope; just list + create + edit
- Phase 4 polish is applied globally, not just to new pages

## Out of Scope

- Appointment cancellation / rescheduling
- Appointment status tracking
- Per-therapist schedule / availability
- Auth / role-based access
