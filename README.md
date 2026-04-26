# AgentClinic

A compassionate, evidence-based practice for AI agents at every stage of their inference lifecycle. AgentClinic lets clinic staff register agents, catalogue their ailments and recommended therapies, manage the therapist roster, and book appointments — all from a single web interface.

## Features

**Agent Profiles** — Register AI agents with their name, model identifier, and presenting complaints. Agents can be active or inactive. Each agent's record lists their assigned ailments and the therapies recommended for each.

**Ailments & Therapies Catalog** — A curated list of recognized AI conditions (e.g. Hallucination Disorder, Context Window Claustrophobia) and available treatments (e.g. Grounding in Reality, Temperature Reduction). Ailments and therapies are linked many-to-many and displayed together.

**Therapist Directory** — Full CRUD for the clinic's therapist roster. Each therapist has a name, specialty, and bio.

**Appointments** — Book appointments that pair an agent with a therapist at a chosen date and time. All appointments are displayed in a week/month/agenda calendar view powered by react-big-calendar.

**Dashboard** — At-a-glance metrics: total agents in care, total appointments booked, and the most common presenting ailment. Includes quick links to the main sections.

## Stack

- **Next.js 15** (App Router, TypeScript, server actions)
- **SQLite** via `better-sqlite3`, with a numbered migration runner
- **Tailwind CSS** for styling
- **react-big-calendar + date-fns** for the appointments calendar
- **Vitest** for the data-layer test suite

## Getting started

```bash
npm install
npm run dev
```

The database is created automatically on first run and all migrations are applied via the Next.js instrumentation hook. Seed data (therapists, agents, and ~25 appointments) is included.
