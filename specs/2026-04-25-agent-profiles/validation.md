# Validation — Phase 1: Agent Profiles

## Definition of Done

This phase is mergeable when all of the following pass.

## Checklist

### Automated Tests

- [ ] `npm test` passes with no failures (existing migration tests + new agent tests)
- [ ] `lib/agents.ts` has Vitest unit tests covering: `getAllAgents`, `getAgentById`, `createAgent`, `updateAgent`, `deactivateAgent`
- [ ] Tests use an isolated temp DB (same pattern as `db/client.test.ts`)
- [ ] `npx tsc --noEmit` passes with no type errors

### Database

- [ ] Migration `0002_agents.sql` applies cleanly on a fresh DB
- [ ] Migration is idempotent (re-running does not error)
- [ ] `db/schema.sql` reflects the `agents` table

## Smoke Test (manual fallback)

1. `npm run dev`
2. Navigate to `/agents` — empty state renders
3. Click "New Agent" — form loads with a generated name
4. Fill in model and complaints, submit — redirected to detail page, data correct
5. Click Edit — form pre-filled, change a field, save — detail page shows update
6. Click Deactivate — redirected to list, card is greyed out
7. Create a second agent — both cards visible, active one full color, inactive one grey
