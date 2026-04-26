CREATE TABLE agents (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  name                  TEXT    NOT NULL,
  model                 TEXT    NOT NULL DEFAULT '',
  presenting_complaints TEXT    NOT NULL DEFAULT '',
  status                TEXT    NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active', 'inactive')),
  created_at            TEXT    NOT NULL DEFAULT (datetime('now'))
);
