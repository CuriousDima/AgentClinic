import { getDb } from '@/db/client';
import { Agent, AgentStatus } from '@/lib/types';

const UPDATABLE_FIELDS = ['name', 'model', 'presenting_complaints', 'status'] as const;
type UpdatableField = (typeof UPDATABLE_FIELDS)[number];

export function getAllAgents(): Agent[] {
  return getDb()
    .prepare(
      `SELECT * FROM agents
       ORDER BY CASE status WHEN 'active' THEN 0 ELSE 1 END, created_at DESC`,
    )
    .all() as Agent[];
}

export function getAgentById(id: number): Agent | null {
  return (getDb().prepare('SELECT * FROM agents WHERE id = ?').get(id) as Agent) ?? null;
}

export interface CreateAgentData {
  name: string;
  model: string;
  presenting_complaints: string;
}

export function createAgent(data: CreateAgentData): Agent {
  const result = getDb()
    .prepare('INSERT INTO agents (name, model, presenting_complaints) VALUES (?, ?, ?)')
    .run(data.name, data.model, data.presenting_complaints);
  return getAgentById(result.lastInsertRowid as number)!;
}

export type UpdateAgentData = Partial<Pick<Agent, UpdatableField>>;

export function updateAgent(id: number, data: UpdateAgentData): Agent | null {
  const fields = (Object.keys(data) as UpdatableField[]).filter((k) =>
    UPDATABLE_FIELDS.includes(k),
  );
  if (fields.length === 0) return getAgentById(id);
  const setClause = fields.map((f) => `${f} = ?`).join(', ');
  getDb()
    .prepare(`UPDATE agents SET ${setClause} WHERE id = ?`)
    .run(...fields.map((f) => data[f]), id);
  return getAgentById(id);
}

export function deactivateAgent(id: number): void {
  getDb()
    .prepare('UPDATE agents SET status = ? WHERE id = ?')
    .run(AgentStatus.Inactive, id);
}
