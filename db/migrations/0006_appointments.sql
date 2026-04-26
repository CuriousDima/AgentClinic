CREATE TABLE appointments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id     INTEGER NOT NULL REFERENCES agents(id),
  therapist_id INTEGER NOT NULL REFERENCES therapists(id),
  scheduled_at TEXT    NOT NULL,
  notes        TEXT    NOT NULL DEFAULT '',
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);
