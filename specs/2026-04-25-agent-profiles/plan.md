# Plan — Phase 1: Agent Profiles

## Task Group 1 — Database Migration

1. Create `db/migrations/0002_agents.sql` — `agents` table with `id`, `name`, `model`, `presenting_complaints`, `status`, `created_at`
2. Update `db/schema.sql` reference snapshot

## Task Group 2 — Name Generator Utility

3. Install `unique-names-generator` for auto-generating funny agent names
4. Create `lib/agent-name.ts` — exports a single `generateAgentName()` function

## Task Group 3 — Data Layer

5. Create `lib/agents.ts` with plain SQL queries:
   - `getAllAgents()` — all agents, active first
   - `getAgentById(id)` — single agent or null
   - `createAgent(data)` — insert and return new agent
   - `updateAgent(id, data)` — update fields, return updated agent
   - `deactivateAgent(id)` — soft-delete: set `status = 'inactive'`

## Task Group 4 — List Page

6. Create `app/agents/page.tsx` — server component, card-grid layout
7. Active agents render normally; inactive agents render greyed-out
8. Empty state with clinic-appropriate copy
9. "New Agent" button linking to `/agents/new`

## Task Group 5 — Shared Form Component

10. Create `components/AgentForm.tsx` — client component used for both create and edit
    - Name field pre-populated via `generateAgentName()` on create, editable
    - Model (text input), Presenting Complaints (textarea), Status (select: active / inactive)
    - Submit posts to a Server Action

## Task Group 6 — Create & Edit Pages

11. Create `app/agents/new/page.tsx` — renders `AgentForm` with no initial data; Server Action inserts and redirects to detail page
12. Create `app/agents/[id]/edit/page.tsx` — fetches agent, renders `AgentForm` pre-filled; Server Action updates and redirects to detail page

## Task Group 7 — Detail Page

13. Create `app/agents/[id]/page.tsx` — all fields, Edit button, Deactivate button
14. Deactivate triggers a Server Action (soft-delete), redirects back to list

## Task Group 8 — Tests

15. Write Vitest unit tests for all functions in `lib/agents.ts` (uses temp DB, mirrors pattern from `db/client.test.ts`)
16. Visual validation with Playwright MCP: list page, detail page, create flow, edit flow, deactivate flow
