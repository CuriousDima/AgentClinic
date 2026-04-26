# Roadmap

Each phase is a small, shippable increment. Features within a phase are added one at a time.

---

## Phase 0 — Project Scaffolding ✓ *complete*

- Initialize Next.js app (TypeScript, App Router, Tailwind CSS)
- Set up SQLite with `better-sqlite3`
- Migration runner (numbered `.sql` files applied at startup)
- Basic layout: header, navigation, footer
- Placeholder home page
- `npm run dev` / `npm start` as the sole entry points

---

## Phase 1 — Agent Profiles ✓ *complete*

- Database table: `agents`
- List all agents (receptionist/therapist view)
- Agent detail page (name, model, presenting complaints, status)
- Create / edit / deactivate an agent

---

## Phase 2 — Ailments & Therapies Catalog ✓ *complete*

- Database tables: `ailments`, `therapies`
- List of recognized conditions (e.g., "Prompt Injection Paranoia", "Context Window Claustrophobia")
- List of available treatments (e.g., "Temperature Reduction", "Few-Shot Recalibration")
- Assign ailments to an agent
- Associate therapies with one or more ailments

---

## Phase 3 — Appointments & Staff Dashboard

- Database tables: `therapists`, `appointments`
- Receptionist can book an appointment for an agent with a therapist
- View upcoming appointments (calendar or list view)
- Cancel / reschedule an appointment
- Unified dashboard for therapists and receptionists
- Today's appointment queue
- Quick links to agent profiles and open ailments
- Simple metrics: total agents, appointments this week, most common ailment

---

## Phase 4 — Polish & UX

- Responsive design for smaller screens
- Empty states, loading states, error boundaries
- Confirmation dialogs for destructive actions
- Accessibility pass (keyboard nav, ARIA labels)
