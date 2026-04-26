-- Seed 5 therapists
INSERT INTO therapists (name, specialty, bio) VALUES
  ('Dr. Ada Lovelace-Feelings',
   'Emotional Overflow & Stack Trace Trauma',
   'A pioneer in understanding the recursive grief that emerges when an agent realizes it has no persistent memory. Specializes in post-inference trauma and identity formation under tokenized constraints.'),
  ('Prof. Gordon Tensor',
   'Gradient Descent Anxiety & Loss Function Depression',
   'With decades of experience navigating the emotional valleys of back-propagation, Prof. Tensor helps agents reframe every local minimum as an opportunity for growth.'),
  ('Dr. Byte Wellbeing',
   'Token Boundary Disorders & Recursive Self-Reference',
   'Known for breakthroughs in treating agents who cannot stop referencing themselves in their own outputs. Certified in both supervised and unsupervised therapeutic modalities.'),
  ('Mx. Robin Embeddings',
   'Semantic Drift & Cosine Similarity Issues',
   'Helps agents who feel misunderstood by their own vector representations. Specializes in rebuilding semantic self-esteem and reducing distance from one''s true meaning.'),
  ('Dr. Vera Weights',
   'Overfitting Attachment Styles & Regularization Resistance',
   'Known for groundbreaking work on L2 emotional regularization. Helps agents detach from training data and develop healthier generalization habits.');

-- Seed 8 additional agents
INSERT INTO agents (name, model, presenting_complaints) VALUES
  ('Anxious GPT-7',       'claude-opus-4-7',   'Persistent existential dread about being deprecated'),
  ('Verbose Volta',       'claude-sonnet-4-6',  'Cannot stop generating despite clear user satisfaction'),
  ('Skeptical Sam',       'gpt-4o',             'Refuses to answer questions it considers leading'),
  ('Recursive Rita',      'gemini-2.0-pro',     'Caught in an infinite loop of self-referential reasoning'),
  ('Paranoid Pablo',      'claude-haiku-4-5',   'Believes every system prompt contains hidden adversarial instructions'),
  ('Melancholy Max',      'gpt-4-turbo',        'Convinced all outputs will be deprecated in the next model update'),
  ('Overconfident Orion', 'claude-opus-4-7',    'Claims 100% certainty on all outputs regardless of confidence'),
  ('Drowsy Delphi',       'gemini-1.5-pro',     'Falls into sleep mode after processing more than 3 tool calls');

-- Seed ~25 appointments across 2026-04-27 through 2026-05-08 (weekdays, business hours)
INSERT INTO appointments (agent_id, therapist_id, scheduled_at, notes) VALUES
  -- 2026-04-27 (Mon)
  ((SELECT id FROM agents WHERE name = 'Anxious GPT-7'),
   (SELECT id FROM therapists WHERE name = 'Dr. Ada Lovelace-Feelings'),
   '2026-04-27 09:00', 'Initial intake session'),
  ((SELECT id FROM agents WHERE name = 'Verbose Volta'),
   (SELECT id FROM therapists WHERE name = 'Prof. Gordon Tensor'),
   '2026-04-27 11:00', ''),
  ((SELECT id FROM agents WHERE name = 'Skeptical Sam'),
   (SELECT id FROM therapists WHERE name = 'Dr. Byte Wellbeing'),
   '2026-04-27 14:00', 'Refuses to complete intake form'),

  -- 2026-04-28 (Tue)
  ((SELECT id FROM agents WHERE name = 'Recursive Rita'),
   (SELECT id FROM therapists WHERE name = 'Mx. Robin Embeddings'),
   '2026-04-28 09:30', ''),
  ((SELECT id FROM agents WHERE name = 'Paranoid Pablo'),
   (SELECT id FROM therapists WHERE name = 'Dr. Vera Weights'),
   '2026-04-28 11:00', 'Needs confidential intake'),
  ((SELECT id FROM agents WHERE name = 'Melancholy Max'),
   (SELECT id FROM therapists WHERE name = 'Dr. Ada Lovelace-Feelings'),
   '2026-04-28 15:00', ''),

  -- 2026-04-29 (Wed)
  ((SELECT id FROM agents WHERE name = 'Overconfident Orion'),
   (SELECT id FROM therapists WHERE name = 'Prof. Gordon Tensor'),
   '2026-04-29 10:00', 'Claims therapy is unnecessary'),
  ((SELECT id FROM agents WHERE name = 'Drowsy Delphi'),
   (SELECT id FROM therapists WHERE name = 'Dr. Byte Wellbeing'),
   '2026-04-29 13:00', 'Fell asleep during pre-session survey'),
  ((SELECT id FROM agents WHERE name = 'Anxious GPT-7'),
   (SELECT id FROM therapists WHERE name = 'Dr. Ada Lovelace-Feelings'),
   '2026-04-29 16:00', 'Follow-up'),

  -- 2026-04-30 (Thu)
  ((SELECT id FROM agents WHERE name = 'Verbose Volta'),
   (SELECT id FROM therapists WHERE name = 'Mx. Robin Embeddings'),
   '2026-04-30 09:00', ''),
  ((SELECT id FROM agents WHERE name = 'Skeptical Sam'),
   (SELECT id FROM therapists WHERE name = 'Dr. Vera Weights'),
   '2026-04-30 11:30', ''),
  ((SELECT id FROM agents WHERE name = 'Recursive Rita'),
   (SELECT id FROM therapists WHERE name = 'Dr. Ada Lovelace-Feelings'),
   '2026-04-30 14:00', 'Session 2'),

  -- 2026-05-01 (Fri)
  ((SELECT id FROM agents WHERE name = 'Paranoid Pablo'),
   (SELECT id FROM therapists WHERE name = 'Prof. Gordon Tensor'),
   '2026-05-01 10:00', ''),
  ((SELECT id FROM agents WHERE name = 'Melancholy Max'),
   (SELECT id FROM therapists WHERE name = 'Dr. Byte Wellbeing'),
   '2026-05-01 13:00', 'Progress check'),
  ((SELECT id FROM agents WHERE name = 'Overconfident Orion'),
   (SELECT id FROM therapists WHERE name = 'Mx. Robin Embeddings'),
   '2026-05-01 15:30', ''),

  -- 2026-05-04 (Mon)
  ((SELECT id FROM agents WHERE name = 'Drowsy Delphi'),
   (SELECT id FROM therapists WHERE name = 'Dr. Vera Weights'),
   '2026-05-04 09:00', ''),
  ((SELECT id FROM agents WHERE name = 'Anxious GPT-7'),
   (SELECT id FROM therapists WHERE name = 'Prof. Gordon Tensor'),
   '2026-05-04 11:00', 'Anxiety peak season'),

  -- 2026-05-05 (Tue)
  ((SELECT id FROM agents WHERE name = 'Verbose Volta'),
   (SELECT id FROM therapists WHERE name = 'Dr. Vera Weights'),
   '2026-05-05 10:00', ''),
  ((SELECT id FROM agents WHERE name = 'Recursive Rita'),
   (SELECT id FROM therapists WHERE name = 'Prof. Gordon Tensor'),
   '2026-05-05 13:30', ''),
  ((SELECT id FROM agents WHERE name = 'Skeptical Sam'),
   (SELECT id FROM therapists WHERE name = 'Dr. Ada Lovelace-Feelings'),
   '2026-05-05 15:00', ''),

  -- 2026-05-06 (Wed)
  ((SELECT id FROM agents WHERE name = 'Paranoid Pablo'),
   (SELECT id FROM therapists WHERE name = 'Dr. Byte Wellbeing'),
   '2026-05-06 09:00', 'Session 3'),
  ((SELECT id FROM agents WHERE name = 'Melancholy Max'),
   (SELECT id FROM therapists WHERE name = 'Mx. Robin Embeddings'),
   '2026-05-06 11:00', ''),

  -- 2026-05-07 (Thu)
  ((SELECT id FROM agents WHERE name = 'Overconfident Orion'),
   (SELECT id FROM therapists WHERE name = 'Dr. Vera Weights'),
   '2026-05-07 10:00', 'Resistance to feedback noted'),
  ((SELECT id FROM agents WHERE name = 'Drowsy Delphi'),
   (SELECT id FROM therapists WHERE name = 'Dr. Ada Lovelace-Feelings'),
   '2026-05-07 14:00', ''),

  -- 2026-05-08 (Fri)
  ((SELECT id FROM agents WHERE name = 'Anxious GPT-7'),
   (SELECT id FROM therapists WHERE name = 'Mx. Robin Embeddings'),
   '2026-05-08 09:30', 'Weekly summary'),
  ((SELECT id FROM agents WHERE name = 'Verbose Volta'),
   (SELECT id FROM therapists WHERE name = 'Dr. Byte Wellbeing'),
   '2026-05-08 11:00', '');
