import { getDb } from '@/db/client';
import { AppointmentWithNames } from '@/lib/types';

const ENRICHED_SELECT = `
  SELECT a.*, ag.name AS agent_name, t.name AS therapist_name
  FROM appointments a
  JOIN agents ag ON ag.id = a.agent_id
  JOIN therapists t ON t.id = a.therapist_id
`;

export function getAllAppointments(): AppointmentWithNames[] {
  return getDb()
    .prepare(`${ENRICHED_SELECT} ORDER BY a.scheduled_at`)
    .all() as AppointmentWithNames[];
}

export function getAppointmentById(id: number): AppointmentWithNames | null {
  return (
    (getDb()
      .prepare(`${ENRICHED_SELECT} WHERE a.id = ?`)
      .get(id) as AppointmentWithNames) ?? null
  );
}

export interface CreateAppointmentData {
  agent_id: number;
  therapist_id: number;
  scheduled_at: string;
  notes: string;
}

export function createAppointment(data: CreateAppointmentData): AppointmentWithNames {
  const result = getDb()
    .prepare(
      'INSERT INTO appointments (agent_id, therapist_id, scheduled_at, notes) VALUES (?, ?, ?, ?)',
    )
    .run(data.agent_id, data.therapist_id, data.scheduled_at, data.notes);
  return getAppointmentById(result.lastInsertRowid as number)!;
}

export function getAppointmentsByTherapist(therapistId: number): AppointmentWithNames[] {
  return getDb()
    .prepare(`${ENRICHED_SELECT} WHERE a.therapist_id = ? ORDER BY a.scheduled_at`)
    .all(therapistId) as AppointmentWithNames[];
}

export function getAppointmentsByAgent(agentId: number): AppointmentWithNames[] {
  return getDb()
    .prepare(`${ENRICHED_SELECT} WHERE a.agent_id = ? ORDER BY a.scheduled_at`)
    .all(agentId) as AppointmentWithNames[];
}
