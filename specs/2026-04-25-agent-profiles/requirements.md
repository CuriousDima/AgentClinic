# Requirements — Phase 1: Agent Profiles

## Scope

Introduce the `agents` table and all CRUD surfaces: list, detail, create/edit (shared form), and deactivate. This is the first real data model in the app — everything in later phases hangs off agents.

## Database Schema

```sql
CREATE TABLE agents (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  name                  TEXT    NOT NULL,
  model                 TEXT    NOT NULL DEFAULT '',
  presenting_complaints TEXT    NOT NULL DEFAULT '',
  status                TEXT    NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active', 'inactive')),
  created_at            TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

## Field Decisions

| Field | Type | Notes |
|---|---|---|
| `name` | `TEXT` | Auto-populated with a funny generated name; user may override |
| `model` | `TEXT` | Free-text string (e.g. "claude-sonnet-4-6", "gpt-4o") |
| `presenting_complaints` | `TEXT` | Plain text; free-form, may be blank |
| `status` | `TEXT` enum | `AgentStatus.Active` or `AgentStatus.Inactive`; defaults to `'active'` in DB, `AgentStatus.Active` in code |
| `created_at` | `TEXT` | SQLite datetime string, set at insert |

## Name Generation

- Package: `unique-names-generator` (lightweight, configurable, no runtime overhead)
- Format: adjective + animal, e.g. "Anxious Llama", "Paranoid Corgi", "Verbose Mongoose"
- Generated on the client when the create form loads; field remains editable

## UI Decisions

- **List view**: card grid (3 columns desktop), each card shows name, model, status badge
- **Inactive agents**: rendered in the same grid but visually greyed out (`opacity-50` or muted colors); not hidden
- **Empty state**: clinic-appropriate copy, link to create first agent
- **Create/Edit**: single shared `AgentForm` component; no separate pages for create vs. edit logic
- **Deactivate**: button on detail page; no hard-delete exposed in the UI
- **No confirmation dialog** for deactivate (that's Phase 4 — Polish)

## TypeScript Enum

`AgentStatus` is defined as a `const` enum in `lib/types.ts`:

```typescript
export const AgentStatus = {
  Active: 'active',
  Inactive: 'inactive',
} as const;
export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus];
```

- The DB column stores the string values (`'active'` / `'inactive'`) via the CHECK constraint
- All TypeScript code references `AgentStatus.Active` / `AgentStatus.Inactive` — no bare string literals for status anywhere

## Server Actions

All mutations use Next.js Server Actions (no separate API routes).

## Out of Scope for This Phase

- Assigning ailments to agents (Phase 2)
- Pagination or search on the agent list
- Confirmation dialogs (Phase 4)
- Responsive/mobile polish (Phase 4)
