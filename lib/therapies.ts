import { getDb } from '@/db/client';
import { Ailment, Therapy } from '@/lib/types';

export function getAllTherapies(): Therapy[] {
  return getDb()
    .prepare('SELECT * FROM therapies ORDER BY name')
    .all() as Therapy[];
}

export function getTherapyById(id: number): Therapy | null {
  return (getDb().prepare('SELECT * FROM therapies WHERE id = ?').get(id) as Therapy) ?? null;
}

export function getAilmentsForTherapy(therapyId: number): Ailment[] {
  return getDb()
    .prepare(
      `SELECT a.* FROM ailments a
       JOIN ailment_therapies at ON at.ailment_id = a.id
       WHERE at.therapy_id = ?
       ORDER BY a.name`,
    )
    .all(therapyId) as Ailment[];
}
