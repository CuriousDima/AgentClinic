CREATE TABLE agent_ailments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id   INTEGER NOT NULL REFERENCES agents(id),
  ailment_id INTEGER NOT NULL REFERENCES ailments(id),
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE (agent_id, ailment_id)
);
