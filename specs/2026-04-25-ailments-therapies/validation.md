# Validation — Phase 2: Ailments & Therapies Catalog

## Definition of Done

This phase is mergeable when all of the following pass.

---

## Checklist

### Automated Tests

- [ ] `npm test` passes with no failures
- [ ] `lib/ailments.ts` has Vitest tests covering: `getAllAilments`, `getAilmentById`, `getTherapiesForAilment`
- [ ] `lib/therapies.ts` has Vitest tests covering: `getAllTherapies`, `getTherapyById`, `getAilmentsForTherapy`
- [ ] `lib/agent-ailments.ts` has Vitest tests covering: `getAilmentsForAgent`, `assignAilment` (including duplicate-assign guard), `removeAilment`
- [ ] All tests use an isolated temp DB (same pattern as `db/client.test.ts`)
- [ ] `npx tsc --noEmit` passes with no type errors

### Database

- [ ] Migrations `0003_ailments.sql` and `0004_agent_ailments.sql` apply cleanly on a fresh DB
- [ ] Migrations are idempotent (re-running does not error)
- [ ] `db/schema.sql` reflects all four new tables (`ailments`, `therapies`, `ailment_therapies`, `agent_ailments`)
- [ ] Seeded data is present after migration: 8 ailments, 7 therapies, all associations

## Smoke Test (manual fallback)

1. `npm run dev`
2. Navigate to `/ailments` — 8 ailment cards visible, each with therapy tags
3. Navigate to `/therapies` — 7 therapy cards visible, each with ailment tags
4. Open any agent detail page — Ailments section visible, initially empty
5. Assign "Hallucination Disorder" — card appears with "Grounding in Reality" and "Few-Shot Recalibration" tags
6. Assign a second ailment — both appear in the list
7. Remove one ailment — list shrinks; ailment reappears in the dropdown
8. Attempt to assign the same ailment again — no duplicate created
