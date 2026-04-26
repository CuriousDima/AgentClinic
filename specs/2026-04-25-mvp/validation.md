# Validation — MVP (Phase 3 + Phase 4)

## Definition of Done

The `mvp` branch is shippable when all of the following pass.

---

## Checklist

### Automated Tests

- [ ] `npm test` passes with no failures
- [ ] `lib/therapists.ts` has Vitest tests covering: `getAllTherapists`, `getTherapistById`, `createTherapist`, `updateTherapist`
- [ ] `lib/appointments.ts` has Vitest tests covering: `getAllAppointments`, `getAppointmentById`, `createAppointment`, `getAppointmentsByTherapist`
- [ ] All tests use an isolated temp DB (same pattern as existing test files)
- [ ] `npx tsc --noEmit` passes with no type errors

### Database

- [ ] Migrations `0005`, `0006`, `0007` apply cleanly on a fresh DB
- [ ] Migrations are idempotent
- [ ] `db/schema.sql` reflects `therapists` and `appointments` tables
- [ ] After migration: 5 therapists, ≥8 seeded agents, ~25 appointments present

### Therapist CRUD

- [ ] `/therapists` lists all therapists
- [ ] "New Therapist" button navigates to the create form
- [ ] Submitting the create form inserts the therapist and redirects to the detail page
- [ ] Detail page shows name, specialty, bio, and an Edit button
- [ ] Edit form is pre-filled; saving updates and redirects back to the detail page

### Appointments

- [ ] `/appointments` renders the calendar component with seeded appointments visible
- [ ] Week view is the default; month and agenda views are accessible
- [ ] Each event shows the agent name and therapist name
- [ ] "New Appointment" button navigates to the booking form
- [ ] Booking form dropdowns list all agents and all therapists
- [ ] Submitting a valid booking redirects to `/appointments` and the new event appears on the calendar

### Dashboard

- [ ] `/dashboard` shows three stat cards: total agents, total appointments, most common ailment
- [ ] Counts are accurate against the seeded data
- [ ] Quick-links to `/agents`, `/appointments`, `/ailments`, `/therapies`, `/therapists` are all present and functional

### Phase 4 — Responsive Design

- [ ] All card grids collapse to a single column on a 375 px viewport
- [ ] Nav is usable (no overflow, no clipped text) at 375 px

### Phase 4 — Loading & Error States

- [ ] Navigating to `/agents`, `/appointments`, `/dashboard`, `/therapists` shows a loading indicator before content appears (verify by throttling network in dev tools)
- [ ] Each route with an error boundary renders a graceful error message when an exception is thrown

### Phase 4 — Confirmation Dialogs

- [ ] Clicking "Deactivate" on an agent shows a confirmation prompt before proceeding
- [ ] Dismissing the prompt leaves the agent active

### Phase 4 — Accessibility

- [ ] Every page has exactly one `<h1>`
- [ ] All form inputs have a visible, associated `<label>`
- [ ] Tabbing through the agent detail page reaches: Edit, Deactivate, Assign Ailment select, Assign button, and all Remove buttons — in a logical order
- [ ] No interactive element is reachable only by mouse

---

## Smoke Test (manual fallback)

1. `npm run dev` on a fresh DB — migrations apply, seed data present
2. `/therapists` → 5 cards visible → click "New Therapist" → fill form → saved, detail page correct
3. `/appointments` → calendar shows seeded appointments in week view → click "New Appointment" → book an agent with a therapist for next Monday → event appears on calendar
4. `/dashboard` → three stat cards show non-zero values; all quick-links work
5. Resize browser to 375 px → all pages legible, no overflow
6. Agent detail page → click "Deactivate" → confirm prompt appears → confirm → agent greyed out in list
7. Keyboard only: tab through agent detail page, reach and activate all interactive controls without using the mouse
