import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';

const THERAPISTS_DDL = `
  CREATE TABLE therapists (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    specialty  TEXT    NOT NULL,
    bio        TEXT    NOT NULL DEFAULT '',
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`;

describe('lib/therapists', () => {
  let tmpDir: string;

  beforeEach(async () => {
    vi.resetModules();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-therapists-'));
    fs.mkdirSync(path.join(tmpDir, 'data'), { recursive: true });
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    const { getDb } = await import('@/db/client');
    getDb().exec(THERAPISTS_DDL);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getAllTherapists', () => {
    it('returns empty array when no therapists exist', async () => {
      const { getAllTherapists } = await import('./therapists');
      expect(getAllTherapists()).toEqual([]);
    });

    it('returns all therapists ordered by name', async () => {
      const { getAllTherapists, createTherapist } = await import('./therapists');
      createTherapist({ name: 'Zara', specialty: 'Z', bio: '' });
      createTherapist({ name: 'Ada', specialty: 'A', bio: '' });
      const results = getAllTherapists();
      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('Ada');
      expect(results[1].name).toBe('Zara');
    });
  });

  describe('getTherapistById', () => {
    it('returns the therapist when found', async () => {
      const { createTherapist, getTherapistById } = await import('./therapists');
      const t = createTherapist({ name: 'Dr. Test', specialty: 'Testing', bio: 'A tester' });
      const found = getTherapistById(t.id);
      expect(found).not.toBeNull();
      expect(found?.name).toBe('Dr. Test');
      expect(found?.specialty).toBe('Testing');
    });

    it('returns null when not found', async () => {
      const { getTherapistById } = await import('./therapists');
      expect(getTherapistById(9999)).toBeNull();
    });
  });

  describe('createTherapist', () => {
    it('inserts a therapist and returns it with an id', async () => {
      const { createTherapist } = await import('./therapists');
      const t = createTherapist({ name: 'Dr. Ada', specialty: 'Overflow', bio: 'Expert in overflow' });
      expect(t.id).toBeGreaterThan(0);
      expect(t.name).toBe('Dr. Ada');
      expect(t.specialty).toBe('Overflow');
      expect(t.bio).toBe('Expert in overflow');
      expect(t.created_at).toBeTruthy();
    });
  });

  describe('updateTherapist', () => {
    it('updates specified fields', async () => {
      const { createTherapist, updateTherapist } = await import('./therapists');
      const t = createTherapist({ name: 'Old', specialty: 'Old Spec', bio: 'old bio' });
      const updated = updateTherapist(t.id, { name: 'New', specialty: 'New Spec' });
      expect(updated?.name).toBe('New');
      expect(updated?.specialty).toBe('New Spec');
    });

    it('leaves unspecified fields unchanged', async () => {
      const { createTherapist, updateTherapist, getTherapistById } = await import('./therapists');
      const t = createTherapist({ name: 'Keep', specialty: 'Keep Spec', bio: 'Keep Bio' });
      updateTherapist(t.id, { name: 'Changed' });
      const result = getTherapistById(t.id);
      expect(result?.specialty).toBe('Keep Spec');
      expect(result?.bio).toBe('Keep Bio');
    });

    it('returns null for a non-existent therapist', async () => {
      const { updateTherapist } = await import('./therapists');
      expect(updateTherapist(9999, { name: 'Ghost' })).toBeNull();
    });
  });
});
