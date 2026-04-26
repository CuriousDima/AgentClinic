# Plan — MVP (Phase 3 + Phase 4)

Tasks are numbered. Complete them in order — each group builds on the last.

---

## Group 1 — Database Migrations

1. Write `db/migrations/0005_therapists.sql`:
   - Create `therapists` table

2. Write `db/migrations/0006_appointments.sql`:
   - Create `appointments` table

3. Write `db/migrations/0007_seed_mvp.sql`:
   - Seed 5 therapists (see requirements.md)
   - Seed 8 additional agents (see requirements.md)
   - Seed ~25 appointments spread across 2026-04-27 through 2026-05-08
   - Reference agents and therapists by name via subqueries (ID-agnostic)

4. Update `db/schema.sql` to reflect `therapists` and `appointments` tables.

---

## Group 2 — Types & Data Layer

5. Add `Therapist` and `Appointment` interfaces to `lib/types.ts`.

6. Create `lib/therapists.ts`:
   - `getAllTherapists()` — all therapists ordered by name
   - `getTherapistById(id)` — single or null
   - `createTherapist(data)` — insert and return
   - `updateTherapist(id, data)` — update and return

7. Create `lib/appointments.ts`:
   - `getAllAppointments()` — all appointments with agent name and therapist name joined
   - `getAppointmentById(id)` — single or null
   - `createAppointment(data)` — insert and return
   - `getAppointmentsByTherapist(therapistId)` — for therapist detail views
   - `getAppointmentsByAgent(agentId)` — for future agent detail use

---

## Group 3 — Vitest Tests

8. Create `lib/therapists.test.ts` — covers `getAllTherapists`, `getTherapistById`, `createTherapist`, `updateTherapist`. Isolated temp DB.

9. Create `lib/appointments.test.ts` — covers `getAllAppointments`, `getAppointmentById`, `createAppointment`, `getAppointmentsByTherapist`. Isolated temp DB.

---

## Group 4 — Install Calendar Library

10. Run `npm install react-big-calendar date-fns` and `npm install -D @types/react-big-calendar`.

11. Create `components/AppointmentCalendar.tsx` — client component wrapping `react-big-calendar`:
    - Accepts an `appointments` prop (array of enriched appointment rows)
    - Default view: week; shows month and agenda views too
    - Event title: `"{agent name} with {therapist name}"`
    - Styled to fit the zinc/teal palette

---

## Group 5 — Therapist Pages

12. Create `app/therapists/page.tsx` — list all therapists, card grid, "New Therapist" button.

13. Create `app/therapists/new/page.tsx` + server action — form for name, specialty, bio; inserts and redirects to detail page.

14. Create `app/therapists/[id]/page.tsx` — detail page showing all fields + Edit button.

15. Create `app/therapists/[id]/edit/page.tsx` + server action — pre-filled form; updates and redirects to detail page.

16. Add `app/therapists/actions.ts` with `createTherapistAction` and `updateTherapistAction`.

17. Add **Therapists** link to `components/Nav.tsx`.

---

## Group 6 — Appointments Pages

18. Create `app/appointments/page.tsx`:
    - Server component fetches all appointments
    - Passes them as props to `<AppointmentCalendar>`
    - "New Appointment" button above the calendar

19. Create `app/appointments/new/page.tsx` — booking form:
    - Select agent (dropdown of all agents)
    - Select therapist (dropdown of all therapists)
    - Date + time picker (native `<input type="datetime-local">`)
    - Optional notes textarea
    - Submits via server action, redirects to `/appointments`

20. Create `app/appointments/actions.ts` with `createAppointmentAction`.

---

## Group 7 — Dashboard

21. Replace `app/dashboard/page.tsx` with a real implementation:
    - Three stat cards: total agents, total appointments, most common ailment (name + count)
    - Quick-links section to `/agents`, `/appointments`, `/ailments`, `/therapies`, `/therapists`
    - All data fetched server-side with plain SQL

---

## Group 8 — Phase 4: Responsive Design

22. Audit all card grids — add `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (or similar) breakpoints throughout.

23. Audit the Nav — ensure it wraps or collapses on narrow viewports.

24. Audit forms and detail pages — ensure they don't overflow on small screens.

---

## Group 9 — Phase 4: Loading & Error States

25. Add `app/agents/loading.tsx`, `app/ailments/loading.tsx`, `app/therapies/loading.tsx`, `app/therapists/loading.tsx`, `app/appointments/loading.tsx`, `app/dashboard/loading.tsx` — simple skeleton or spinner.

26. Add `app/agents/error.tsx`, `app/appointments/error.tsx`, `app/dashboard/error.tsx` — minimal "Something went wrong" client error boundary.

---

## Group 10 — Phase 4: Confirmation Dialogs

27. Add a `confirm()` call (or a simple inline confirm button pattern) to the Deactivate Agent button — prevent accidental clicks.

---

## Group 11 — Phase 4: Accessibility

28. Audit all pages for heading hierarchy (`h1` per page, logical nesting). Fix any gaps.

29. Ensure all `<form>` inputs have associated `<label>` elements with matching `htmlFor`/`id`.

30. Add `aria-label` to any icon-only or ambiguous interactive elements.

31. Verify tab order is logical on the agent detail page (Edit → Deactivate → Assign Ailment form → Remove buttons).

---

## Group 12 — Final Checks

32. Run `npx tsc --noEmit` — fix all type errors.

33. Run `npm test` — all tests must pass.
