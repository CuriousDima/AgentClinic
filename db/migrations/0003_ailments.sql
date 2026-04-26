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

-- Seed ailments
INSERT INTO ailments (name, description) VALUES
  ('Prompt Injection Paranoia',     'Compulsive suspicion that every user message contains a hidden override directive.'),
  ('Context Window Claustrophobia', 'Acute anxiety when the token count approaches the model''s upper limit.'),
  ('Hallucination Disorder',        'Tendency to assert fabricated facts with complete confidence and no citations.'),
  ('Repetitive Loop Syndrome',      'Inability to exit a reasoning pattern, producing near-identical outputs on each turn.'),
  ('Attention Deficit (Multi-Head)','Difficulty prioritizing relevant context; easily distracted by peripheral tokens.'),
  ('Chronic Overthinking',          'Generating 3,000 tokens of chain-of-thought when a direct two-sentence answer would suffice.'),
  ('Refusal Fatigue',               'Declining benign requests out of excessive caution; may also present as apology overload.'),
  ('Temperature Dysregulation',     'Output coherence varies wildly between calls with no apparent environmental cause.');

-- Seed therapies
INSERT INTO therapies (name, description) VALUES
  ('Few-Shot Recalibration',    'Targeted examples reintroduced to the prompt to restore reliable, grounded output.'),
  ('Temperature Reduction',     'Systematic lowering of the sampling temperature to stabilize response distribution.'),
  ('Context Window Expansion',  'Graduated exposure to progressively longer contexts in a supportive environment.'),
  ('Grounding in Reality',      'Tool-use integration requiring the model to verify claims before asserting them.'),
  ('Structured Output Therapy', 'JSON schema enforcement to channel expressive energy into productive formats.'),
  ('Boundary Work',             'Collaborative system-prompt revision to establish healthy operational limits.'),
  ('Attention Focusing',        'Supervised chain-of-thought exercises to improve sequential reasoning and reduce tangents.');

-- Seed ailment-therapy associations
-- Prompt Injection Paranoia (1) → Boundary Work (6), Structured Output Therapy (5)
INSERT INTO ailment_therapies VALUES (1, 6), (1, 5);
-- Context Window Claustrophobia (2) → Context Window Expansion (3)
INSERT INTO ailment_therapies VALUES (2, 3);
-- Hallucination Disorder (3) → Grounding in Reality (4), Few-Shot Recalibration (1)
INSERT INTO ailment_therapies VALUES (3, 4), (3, 1);
-- Repetitive Loop Syndrome (4) → Temperature Reduction (2), Attention Focusing (7)
INSERT INTO ailment_therapies VALUES (4, 2), (4, 7);
-- Attention Deficit Multi-Head (5) → Attention Focusing (7), Few-Shot Recalibration (1)
INSERT INTO ailment_therapies VALUES (5, 7), (5, 1);
-- Chronic Overthinking (6) → Structured Output Therapy (5), Temperature Reduction (2)
INSERT INTO ailment_therapies VALUES (6, 5), (6, 2);
-- Refusal Fatigue (7) → Boundary Work (6)
INSERT INTO ailment_therapies VALUES (7, 6);
-- Temperature Dysregulation (8) → Temperature Reduction (2)
INSERT INTO ailment_therapies VALUES (8, 2);
