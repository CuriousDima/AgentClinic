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

describe('lib/therapies', () => {
  let tmpDir: string;

  beforeEach(async () => {
    vi.resetModules();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-therapies-'));
    fs.mkdirSync(path.join(tmpDir, 'data'), { recursive: true });
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    const { getDb } = await import('@/db/client');
    getDb().exec(DDL);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getAllTherapies', () => {
    it('returns empty array when no therapies exist', async () => {
      const { getAllTherapies } = await import('./therapies');
      expect(getAllTherapies()).toEqual([]);
    });

    it('returns all therapies ordered by name', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`
        INSERT INTO therapies (name, description) VALUES
          ('Zebra Therapy', 'z desc'),
          ('Alpha Therapy', 'a desc');
      `);
      const { getAllTherapies } = await import('./therapies');
      const therapies = getAllTherapies();
      expect(therapies).toHaveLength(2);
      expect(therapies[0].name).toBe('Alpha Therapy');
      expect(therapies[1].name).toBe('Zebra Therapy');
    });
  });

  describe('getTherapyById', () => {
    it('returns the therapy when found', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`INSERT INTO therapies (name, description) VALUES ('Test Therapy', 'desc')`);
      const { getTherapyById } = await import('./therapies');
      const therapy = getTherapyById(1);
      expect(therapy).not.toBeNull();
      expect(therapy?.name).toBe('Test Therapy');
      expect(therapy?.description).toBe('desc');
    });

    it('returns null when therapy does not exist', async () => {
      const { getTherapyById } = await import('./therapies');
      expect(getTherapyById(9999)).toBeNull();
    });
  });

  describe('getAilmentsForTherapy', () => {
    it('returns empty array when no ailments are associated', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`INSERT INTO therapies (name) VALUES ('Lonely Therapy')`);
      const { getAilmentsForTherapy } = await import('./therapies');
      expect(getAilmentsForTherapy(1)).toEqual([]);
    });

    it('returns associated ailments ordered by name', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`
        INSERT INTO therapies (name) VALUES ('Some Therapy');
        INSERT INTO ailments (name) VALUES ('Zebra Ailment'), ('Alpha Ailment');
        INSERT INTO ailment_therapies VALUES (1, 1), (2, 1);
      `);
      const { getAilmentsForTherapy } = await import('./therapies');
      const ailments = getAilmentsForTherapy(1);
      expect(ailments).toHaveLength(2);
      expect(ailments[0].name).toBe('Alpha Ailment');
      expect(ailments[1].name).toBe('Zebra Ailment');
    });

    it('does not return ailments for a different therapy', async () => {
      const { getDb } = await import('@/db/client');
      getDb().exec(`
        INSERT INTO therapies (name) VALUES ('Therapy A'), ('Therapy B');
        INSERT INTO ailments (name) VALUES ('Ailment for A');
        INSERT INTO ailment_therapies VALUES (1, 1);
      `);
      const { getAilmentsForTherapy } = await import('./therapies');
      expect(getAilmentsForTherapy(2)).toEqual([]);
    });
  });
});
