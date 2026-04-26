# Plan — Phase 1: Agent Profiles

## Task Group 1 — Database Migration

1. Create `db/migrations/0002_agents.sql` — `agents` table with `id`, `name`, `model`, `presenting_complaints`, `status`, `created_at`
2. Update `db/schema.sql` reference snapshot

## Task Group 2 — Name Generator Utility

3. Install `unique-names-generator` for auto-generating funny agent names
4. Create `lib/agent-name.ts` — exports a single `generateAgentName()` function

## Task Group 3 — Shared Types

5. Create `lib/types.ts` — define `AgentStatus` as a TypeScript `const` enum (`Active = 'active'`, `Inactive = 'inactive'`); export the `Agent` interface using it
6. Use `AgentStatus` everywhere: data layer, form component, Server Actions, and UI rendering — no string literals for status anywhere in the codebase

## Task Group 4 — Data Layer

7. Create `lib/agents.ts` with plain SQL queries:
   - `getAllAgents()` — all agents, active first
   - `getAgentById(id)` — single agent or null
   - `createAgent(data)` — insert and return new agent
   - `updateAgent(id, data)` — update fields, return updated agent
   - `deactivateAgent(id)` — soft-delete: set `status = 'inactive'`

## Task Group 5 — List Page

8. Create `app/agents/page.tsx` — server component, card-grid layout
9. Active agents render normally; inactive agents render greyed-out
10. Empty state with clinic-appropriate copy
11. "New Agent" button linking to `/agents/new`

## Task Group 6 — Shared Form Component

12. Create `components/AgentForm.tsx` — client component used for both create and edit
    - Name field pre-populated via `generateAgentName()` on create, editable
    - Model (text input), Presenting Complaints (textarea), Status (select driven by `AgentStatus` enum values)
    - Submit posts to a Server Action

## Task Group 7 — Create & Edit Pages

13. Create `app/agents/new/page.tsx` — renders `AgentForm` with no initial data; Server Action inserts and redirects to detail page
14. Create `app/agents/[id]/edit/page.tsx` — fetches agent, renders `AgentForm` pre-filled; Server Action updates and redirects to detail page

## Task Group 8 — Detail Page

15. Create `app/agents/[id]/page.tsx` — all fields, Edit button, Deactivate button
16. Deactivate triggers a Server Action (soft-delete using `AgentStatus.Inactive`), redirects back to list

## Task Group 9 — Tests

17. Write Vitest unit tests for all functions in `lib/agents.ts` (uses temp DB, mirrors pattern from `db/client.test.ts`)
