-- Reference snapshot of the current database schema.
-- Not executed at runtime — for human reference and debugging only.
-- Last updated: MVP (therapists & appointments)

-- Migration tracking (maintained automatically by the runner):
-- CREATE TABLE _migrations (
--   id         INTEGER PRIMARY KEY AUTOINCREMENT,
--   name       TEXT    NOT NULL UNIQUE,
--   applied_at TEXT    NOT NULL DEFAULT (datetime('now'))
-- );

CREATE TABLE agents (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  name                  TEXT    NOT NULL,
  model                 TEXT    NOT NULL DEFAULT '',
  presenting_complaints TEXT    NOT NULL DEFAULT '',
  status                TEXT    NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active', 'inactive')),
  created_at            TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE ailments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  description TEXT    NOT NULL DEFAULT '',
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE therapies (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  description TEXT    NOT NULL DEFAULT '',
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE ailment_therapies (
  ailment_id  INTEGER NOT NULL REFERENCES ailments(id),
  therapy_id  INTEGER NOT NULL REFERENCES therapies(id),
  PRIMARY KEY (ailment_id, therapy_id)
);

CREATE TABLE agent_ailments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id   INTEGER NOT NULL REFERENCES agents(id),
  ailment_id INTEGER NOT NULL REFERENCES ailments(id),
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE (agent_id, ailment_id)
);

CREATE TABLE therapists (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  specialty  TEXT    NOT NULL,
  bio        TEXT    NOT NULL DEFAULT '',
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE appointments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id     INTEGER NOT NULL REFERENCES agents(id),
  therapist_id INTEGER NOT NULL REFERENCES therapists(id),
  scheduled_at TEXT    NOT NULL,
  notes        TEXT    NOT NULL DEFAULT '',
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);
