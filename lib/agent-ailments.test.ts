import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';

const DDL = `
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
`;

describe('lib/agent-ailments', () => {
  let tmpDir: string;

  beforeEach(async () => {
    vi.resetModules();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-agent-ailments-'));
    fs.mkdirSync(path.join(tmpDir, 'data'), { recursive: true });
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    const { getDb } = await import('@/db/client');
    getDb().exec(DDL);
    getDb().exec(`
      INSERT INTO agents (name) VALUES ('Agent One'), ('Agent Two');
      INSERT INTO ailments (name) VALUES ('Ailment A'), ('Ailment B');
      INSERT INTO therapies (name) VALUES ('Therapy X');
      INSERT INTO ailment_therapies VALUES (1, 1);
    `);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getAilmentsForAgent', () => {
    it('returns empty array when agent has no ailments', async () => {
      const { getAilmentsForAgent } = await import('./agent-ailments');
      expect(getAilmentsForAgent(1)).toEqual([]);
    });

    it('returns ailments assigned to the agent with their therapies', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (1, 1)`);
      const { getAilmentsForAgent } = await import('./agent-ailments');
      const ailments = getAilmentsForAgent(1);
      expect(ailments).toHaveLength(1);
      expect(ailments[0].name).toBe('Ailment A');
      expect(ailments[0].therapies).toHaveLength(1);
      expect(ailments[0].therapies[0].name).toBe('Therapy X');
    });

    it('can return multiple ailments for one agent', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`
        INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (1, 1), (1, 2);
      `);
      const { getAilmentsForAgent } = await import('./agent-ailments');
      expect(getAilmentsForAgent(1)).toHaveLength(2);
    });

    it('does not return ailments belonging to a different agent', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (2, 1)`);
      const { getAilmentsForAgent } = await import('./agent-ailments');
      expect(getAilmentsForAgent(1)).toEqual([]);
    });
  });

  describe('assignAilment', () => {
    it('assigns an ailment to an agent', async () => {
      const { assignAilment, getAilmentsForAgent } = await import('./agent-ailments');
      assignAilment(1, 1);
      expect(getAilmentsForAgent(1)).toHaveLength(1);
    });

    it('is a no-op when the ailment is already assigned (duplicate guard)', async () => {
      const { assignAilment, getAilmentsForAgent } = await import('./agent-ailments');
      assignAilment(1, 1);
      assignAilment(1, 1);
      expect(getAilmentsForAgent(1)).toHaveLength(1);
    });
  });

  describe('removeAilment', () => {
    it('removes an assigned ailment', async () => {
      const { assignAilment, removeAilment, getAilmentsForAgent } = await import('./agent-ailments');
      assignAilment(1, 1);
      removeAilment(1, 1);
      expect(getAilmentsForAgent(1)).toEqual([]);
    });

    it('is a no-op when the ailment was not assigned', async () => {
      const { removeAilment, getAilmentsForAgent } = await import('./agent-ailments');
      expect(() => removeAilment(1, 1)).not.toThrow();
      expect(getAilmentsForAgent(1)).toEqual([]);
    });
  });
});
