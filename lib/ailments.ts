import { getDb } from '@/db/client';
import { Ailment, AilmentWithTherapies, Therapy } from '@/lib/types';

export function getAllAilments(): Ailment[] {
  return getDb()
    .prepare('SELECT * FROM ailments ORDER BY name')
    .all() as Ailment[];
}

export function getAilmentById(id: number): Ailment | null {
  return (getDb().prepare('SELECT * FROM ailments WHERE id = ?').get(id) as Ailment) ?? null;
}

export function getTherapiesForAilment(ailmentId: number): Therapy[] {
  return getDb()
    .prepare(
      `SELECT t.* FROM therapies t
       JOIN ailment_therapies at ON at.therapy_id = t.id
       WHERE at.ailment_id = ?
       ORDER BY t.name`,
    )
    .all(ailmentId) as Therapy[];
}

export function getAllAilmentsWithTherapies(): AilmentWithTherapies[] {
  const ailments = getAllAilments();
  return ailments.map((a) => ({ ...a, therapies: getTherapiesForAilment(a.id) }));
}
