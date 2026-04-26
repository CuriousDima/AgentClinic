import { getDb } from '@/db/client';
import { AilmentWithTherapies, Therapy } from '@/lib/types';

export function getAilmentsForAgent(agentId: number): AilmentWithTherapies[] {
  const ailments = getDb()
    .prepare(
      `SELECT a.* FROM ailments a
       JOIN agent_ailments aa ON aa.ailment_id = a.id
       WHERE aa.agent_id = ?
       ORDER BY a.name`,
    )
    .all(agentId) as AilmentWithTherapies[];

  const therapyStmt = getDb().prepare(
    `SELECT t.* FROM therapies t
     JOIN ailment_therapies at ON at.therapy_id = t.id
     WHERE at.ailment_id = ?
     ORDER BY t.name`,
  );

  return ailments.map((a) => ({ ...a, therapies: therapyStmt.all(a.id) as Therapy[] }));
}

export function assignAilment(agentId: number, ailmentId: number): void {
  getDb()
    .prepare(
      'INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)',
    )
    .run(agentId, ailmentId);
}

export function removeAilment(agentId: number, ailmentId: number): void {
  getDb()
    .prepare('DELETE FROM agent_ailments WHERE agent_id = ? AND ailment_id = ?')
    .run(agentId, ailmentId);
}
