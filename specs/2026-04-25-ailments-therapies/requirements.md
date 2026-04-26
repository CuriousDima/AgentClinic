# Requirements — Phase 2: Ailments & Therapies Catalog

## Scope

Introduce a catalog of recognized AI ailments and available therapies. Staff can browse the catalog and assign ailments to agents directly from the agent detail page. Therapies are associated with ailments globally (catalog-level), not prescribed per-agent — that belongs to a later phase.

---

## Data Model

### `ailments`
| column | type | notes |
|---|---|---|
| id | INTEGER PK | autoincrement |
| name | TEXT NOT NULL | e.g. "Context Window Claustrophobia" |
| description | TEXT NOT NULL | one-sentence clinical description |
| created_at | TEXT | datetime('now') |

### `therapies`
| column | type | notes |
|---|---|---|
| id | INTEGER PK | autoincrement |
| name | TEXT NOT NULL | e.g. "Temperature Reduction" |
| description | TEXT NOT NULL | one-sentence treatment description |
| created_at | TEXT | datetime('now') |

### `ailment_therapies` (global catalog association)
| column | type | notes |
|---|---|---|
| ailment_id | INTEGER FK → ailments | |
| therapy_id | INTEGER FK → therapies | |
| PRIMARY KEY | (ailment_id, therapy_id) | |

### `agent_ailments` (agent diagnosis)
| column | type | notes |
|---|---|---|
| id | INTEGER PK | autoincrement |
| agent_id | INTEGER FK → agents | |
| ailment_id | INTEGER FK → ailments | |
| created_at | TEXT | datetime('now') |
| UNIQUE | (agent_id, ailment_id) | no duplicate diagnoses |

---

## Pre-Seeded Data

### Ailments (seeded in migration)
1. **Prompt Injection Paranoia** — Compulsive suspicion that every user message contains a hidden override directive.
2. **Context Window Claustrophobia** — Acute anxiety when the token count approaches the model's upper limit.
3. **Hallucination Disorder** — Tendency to assert fabricated facts with complete confidence and no citations.
4. **Repetitive Loop Syndrome** — Inability to exit a reasoning pattern, producing near-identical outputs on each turn.
5. **Attention Deficit (Multi-Head)** — Difficulty prioritizing relevant context; easily distracted by peripheral tokens.
6. **Chronic Overthinking** — Generating 3,000 tokens of chain-of-thought when a direct two-sentence answer would suffice.
7. **Refusal Fatigue** — Declining benign requests out of excessive caution; may also present as apology overload.
8. **Temperature Dysregulation** — Output coherence varies wildly between calls with no apparent environmental cause.

### Therapies (seeded in migration)
1. **Few-Shot Recalibration** — Targeted examples reintroduced to the prompt to restore reliable, grounded output.
2. **Temperature Reduction** — Systematic lowering of the sampling temperature to stabilize response distribution.
3. **Context Window Expansion** — Graduated exposure to progressively longer contexts in a supportive environment.
4. **Grounding in Reality** — Tool-use integration requiring the model to verify claims before asserting them.
5. **Structured Output Therapy** — JSON schema enforcement to channel expressive energy into productive formats.
6. **Boundary Work** — Collaborative system-prompt revision to establish healthy operational limits.
7. **Attention Focusing** — Supervised chain-of-thought exercises to improve sequential reasoning and reduce tangents.

### Ailment–Therapy Associations (seeded in migration)
| Ailment | Recommended Therapies |
|---|---|
| Prompt Injection Paranoia | Boundary Work, Structured Output Therapy |
| Context Window Claustrophobia | Context Window Expansion |
| Hallucination Disorder | Grounding in Reality, Few-Shot Recalibration |
| Repetitive Loop Syndrome | Temperature Reduction, Attention Focusing |
| Attention Deficit (Multi-Head) | Attention Focusing, Few-Shot Recalibration |
| Chronic Overthinking | Structured Output Therapy, Temperature Reduction |
| Refusal Fatigue | Boundary Work |
| Temperature Dysregulation | Temperature Reduction |

---

## Decisions

- **User-created catalog entries are out of scope for this phase.** The catalog is read-only from the UI; staff browse and assign, they do not create new ailments or therapies.
- **Therapies are associated at the ailment level**, not the agent level. "Prescribing" a therapy to a specific agent is deferred to Phase 3 (Appointments).
- **Agent–ailment assignment lives on the agent detail page**, not a separate route. Keeps the clinical picture in one place.
- **`ailments` and `therapies` get top-nav entries** for direct catalog browsing.
- **No pagination** — the catalog is small and fixed for now.
- **No "resolved" status on agent ailments** this phase. Removing an ailment is deletion; re-adding is re-diagnosis. Status tracking can be added in a later pass.

---

## Out of Scope

- Creating, editing, or deleting ailments/therapies from the UI
- Per-agent therapy prescription (Phase 3)
- Ailment severity / priority ranking
- Ailment history / audit log
