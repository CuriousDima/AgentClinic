import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';

const DDL = `
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
`;

describe('lib/ailments', () => {
  let tmpDir: string;

  beforeEach(async () => {
    vi.resetModules();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-ailments-'));
    fs.mkdirSync(path.join(tmpDir, 'data'), { recursive: true });
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    const { getDb } = await import('@/db/client');
    getDb().exec(DDL);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getAllAilments', () => {
    it('returns empty array when no ailments exist', async () => {
      const { getAllAilments } = await import('./ailments');
      expect(getAllAilments()).toEqual([]);
    });

    it('returns all ailments ordered by name', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`
        INSERT INTO ailments (name, description) VALUES
          ('Zebra Syndrome', 'z desc'),
          ('Alpha Disorder', 'a desc');
      `);
      const { getAllAilments } = await import('./ailments');
      const ailments = getAllAilments();
      expect(ailments).toHaveLength(2);
      expect(ailments[0].name).toBe('Alpha Disorder');
      expect(ailments[1].name).toBe('Zebra Syndrome');
    });
  });

  describe('getAilmentById', () => {
    it('returns the ailment when found', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`INSERT INTO ailments (name, description) VALUES ('Test Ailment', 'desc')`);
      const { getAilmentById } = await import('./ailments');
      const ailment = getAilmentById(1);
      expect(ailment).not.toBeNull();
      expect(ailment?.name).toBe('Test Ailment');
      expect(ailment?.description).toBe('desc');
    });

    it('returns null when ailment does not exist', async () => {
      const { getAilmentById } = await import('./ailments');
      expect(getAilmentById(9999)).toBeNull();
    });
  });

  describe('getTherapiesForAilment', () => {
    it('returns empty array when no therapies are associated', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`INSERT INTO ailments (name) VALUES ('Lonely Ailment')`);
      const { getTherapiesForAilment } = await import('./ailments');
      expect(getTherapiesForAilment(1)).toEqual([]);
    });

    it('returns associated therapies ordered by name', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`
        INSERT INTO ailments (name) VALUES ('Some Ailment');
        INSERT INTO therapies (name) VALUES ('Zebra Therapy'), ('Alpha Therapy');
        INSERT INTO ailment_therapies VALUES (1, 1), (1, 2);
      `);
      const { getTherapiesForAilment } = await import('./ailments');
      const therapies = getTherapiesForAilment(1);
      expect(therapies).toHaveLength(2);
      expect(therapies[0].name).toBe('Alpha Therapy');
      expect(therapies[1].name).toBe('Zebra Therapy');
    });

    it('does not return therapies for a different ailment', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`
        INSERT INTO ailments (name) VALUES ('Ailment A'), ('Ailment B');
        INSERT INTO therapies (name) VALUES ('Therapy for A');
        INSERT INTO ailment_therapies VALUES (1, 1);
      `);
      const { getTherapiesForAilment } = await import('./ailments');
      expect(getTherapiesForAilment(2)).toEqual([]);
    });
  });
});
