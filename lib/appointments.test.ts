import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';

const SCHEMA_DDL = `
  CREATE TABLE agents (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    name                  TEXT    NOT NULL,
    model                 TEXT    NOT NULL DEFAULT '',
    presenting_complaints TEXT    NOT NULL DEFAULT '',
    status                TEXT    NOT NULL DEFAULT 'active'
                            CHECK (status IN ('active', 'inactive')),
    created_at            TEXT    NOT NULL DEFAULT (datetime('now'))
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
`;

describe('lib/appointments', () => {
  let tmpDir: string;
  let agentId: number;
  let therapistId: number;

  beforeEach(async () => {
    vi.resetModules();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-appointments-'));
    fs.mkdirSync(path.join(tmpDir, 'data'), { recursive: true });
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    const { getDb } = await import('@/db/client');
    getDb().exec(SCHEMA_DDL);

    const db = getDb();
    const agentResult = db
      .prepare(
        "INSERT INTO agents (name, model, presenting_complaints) VALUES ('Test Agent', 'gpt-4', 'anxiety')",
      )
      .run();
    agentId = agentResult.lastInsertRowid as number;
    const therapistResult = db
      .prepare("INSERT INTO therapists (name, specialty, bio) VALUES ('Dr. Test', 'Testing', 'bio')")
      .run();
    therapistId = therapistResult.lastInsertRowid as number;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getAllAppointments', () => {
    it('returns empty array when no appointments exist', async () => {
      const { getAllAppointments } = await import('./appointments');
      expect(getAllAppointments()).toEqual([]);
    });

    it('returns appointments with agent and therapist names', async () => {
      const { getAllAppointments, createAppointment } = await import('./appointments');
      createAppointment({
        agent_id: agentId,
        therapist_id: therapistId,
        scheduled_at: '2026-05-01 10:00',
        notes: '',
      });
      const results = getAllAppointments();
      expect(results).toHaveLength(1);
      expect(results[0].agent_name).toBe('Test Agent');
      expect(results[0].therapist_name).toBe('Dr. Test');
    });

    it('orders by scheduled_at', async () => {
      const { getAllAppointments, createAppointment } = await import('./appointments');
      createAppointment({ agent_id: agentId, therapist_id: therapistId, scheduled_at: '2026-05-02 10:00', notes: '' });
      createAppointment({ agent_id: agentId, therapist_id: therapistId, scheduled_at: '2026-05-01 10:00', notes: '' });
      const results = getAllAppointments();
      expect(results[0].scheduled_at).toBe('2026-05-01 10:00');
      expect(results[1].scheduled_at).toBe('2026-05-02 10:00');
    });
  });

  describe('getAppointmentById', () => {
    it('returns the appointment when found', async () => {
      const { createAppointment, getAppointmentById } = await import('./appointments');
      const appt = createAppointment({
        agent_id: agentId,
        therapist_id: therapistId,
        scheduled_at: '2026-05-01 10:00',
        notes: 'test note',
      });
      const found = getAppointmentById(appt.id);
      expect(found).not.toBeNull();
      expect(found?.notes).toBe('test note');
      expect(found?.agent_name).toBe('Test Agent');
    });

    it('returns null when not found', async () => {
      const { getAppointmentById } = await import('./appointments');
      expect(getAppointmentById(9999)).toBeNull();
    });
  });

  describe('createAppointment', () => {
    it('inserts an appointment and returns it with an id', async () => {
      const { createAppointment } = await import('./appointments');
      const appt = createAppointment({
        agent_id: agentId,
        therapist_id: therapistId,
        scheduled_at: '2026-05-01 14:00',
        notes: 'intake',
      });
      expect(appt.id).toBeGreaterThan(0);
      expect(appt.agent_id).toBe(agentId);
      expect(appt.therapist_id).toBe(therapistId);
      expect(appt.scheduled_at).toBe('2026-05-01 14:00');
      expect(appt.notes).toBe('intake');
    });
  });

  describe('getAppointmentsByTherapist', () => {
    it('returns only appointments for the given therapist', async () => {
      const { getDb } = await import('@/db/client');
      const otherResult = getDb()
        .prepare("INSERT INTO therapists (name, specialty, bio) VALUES ('Other', 'Other', '')")
        .run();
      const otherTherapistId = otherResult.lastInsertRowid as number;

      const { createAppointment, getAppointmentsByTherapist } = await import('./appointments');
      createAppointment({ agent_id: agentId, therapist_id: therapistId, scheduled_at: '2026-05-01 10:00', notes: '' });
      createAppointment({ agent_id: agentId, therapist_id: otherTherapistId, scheduled_at: '2026-05-01 11:00', notes: '' });

      const results = getAppointmentsByTherapist(therapistId);
      expect(results).toHaveLength(1);
      expect(results[0].therapist_id).toBe(therapistId);
    });
  });
});
