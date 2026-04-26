# Plan — Phase 2: Ailments & Therapies Catalog

Tasks are numbered. Complete them in order — each group builds on the last.

---

## Group 1 — Database Migrations

1. Write `db/migrations/0003_ailments.sql`:
   - Create `ailments` table
   - Create `therapies` table
   - Create `ailment_therapies` join table
   - Seed all 8 ailments, 7 therapies, and their associations (see requirements.md)

2. Write `db/migrations/0004_agent_ailments.sql`:
   - Create `agent_ailments` table with UNIQUE(agent_id, ailment_id)

3. Update `db/schema.sql` to reflect all four new tables.

---

## Group 2 — Data Layer

4. Create `lib/ailments.ts`:
   - `getAllAilments()` — returns all ailments ordered by name
   - `getAilmentById(id)` — returns one ailment or null
   - `getTherapiesForAilment(ailmentId)` — returns therapies associated with an ailment

5. Create `lib/therapies.ts`:
   - `getAllTherapies()` — returns all therapies ordered by name
   - `getTherapyById(id)` — returns one therapy or null
   - `getAilmentsForTherapy(therapyId)` — returns ailments this therapy treats

6. Create `lib/agent-ailments.ts`:
   - `getAilmentsForAgent(agentId)` — returns ailments assigned to an agent, each with its associated therapies
   - `assignAilment(agentId, ailmentId)` — inserts into agent_ailments (no-op if already assigned)
   - `removeAilment(agentId, ailmentId)` — deletes from agent_ailments

---

## Group 3 — Vitest Unit Tests

7. Create `lib/ailments.test.ts` — tests for `getAllAilments`, `getAilmentById`, `getTherapiesForAilment` using isolated temp DB (same pattern as `db/client.test.ts`).

8. Create `lib/therapies.test.ts` — tests for `getAllTherapies`, `getTherapyById`, `getAilmentsForTherapy`.

9. Create `lib/agent-ailments.test.ts` — tests for `getAilmentsForAgent`, `assignAilment` (including duplicate guard), `removeAilment`.

---

## Group 4 — Ailments Catalog Page

10. Create `app/ailments/page.tsx`:
    - Server component; calls `getAllAilments()`
    - Card grid layout (matching Phase 1 agent list style)
    - Each card: ailment name, description, list of recommended therapies
    - Empty state if no ailments (shouldn't happen after seeding)

11. Update `components/Nav.tsx` to add an **Ailments** link.

---

## Group 5 — Therapies Catalog Page

12. Create `app/therapies/page.tsx`:
    - Server component; calls `getAllTherapies()`
    - Card grid layout
    - Each card: therapy name, description, list of ailments it treats

13. Update `components/Nav.tsx` to add a **Therapies** link.

---

## Group 6 — Agent Detail Page — Ailments Section

14. Create `app/agents/[id]/actions.ts` (or extend existing agent actions):
    - `assignAilmentAction(agentId, ailmentId)` — server action wrapping `assignAilment`
    - `removeAilmentAction(agentId, ailmentId)` — server action wrapping `removeAilment`

15. Update `app/agents/[id]/page.tsx`:
    - Add an **Ailments** section below existing agent details
    - Show a list of currently assigned ailments; each entry shows:
      - Ailment name
      - Its recommended therapies (read-only tags)
      - A **Remove** button (calls `removeAilmentAction`)
    - Show an **Assign Ailment** form: a `<select>` of unassigned ailments + submit button
    - If no ailments assigned, show an appropriate empty state

---

## Group 7 — Type Checking & Cleanup

16. Run `npx tsc --noEmit` and fix any type errors.

17. Run `npm test` — all tests must pass.

---

