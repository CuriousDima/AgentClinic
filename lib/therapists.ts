import { getDb } from '@/db/client';
import { Therapist } from '@/lib/types';

export function getAllTherapists(): Therapist[] {
  return getDb()
    .prepare('SELECT * FROM therapists ORDER BY name')
    .all() as Therapist[];
}

export function getTherapistById(id: number): Therapist | null {
  return (getDb().prepare('SELECT * FROM therapists WHERE id = ?').get(id) as Therapist) ?? null;
}

export interface CreateTherapistData {
  name: string;
  specialty: string;
  bio: string;
}

export function createTherapist(data: CreateTherapistData): Therapist {
  const result = getDb()
    .prepare('INSERT INTO therapists (name, specialty, bio) VALUES (?, ?, ?)')
    .run(data.name, data.specialty, data.bio);
  return getTherapistById(result.lastInsertRowid as number)!;
}

export type UpdateTherapistData = Partial<CreateTherapistData>;

export function updateTherapist(id: number, data: UpdateTherapistData): Therapist | null {
  const FIELDS = ['name', 'specialty', 'bio'] as const;
  const fields = FIELDS.filter((k) => k in data);
  if (fields.length === 0) return getTherapistById(id);
  const setClause = fields.map((f) => `${f} = ?`).join(', ');
  getDb()
    .prepare(`UPDATE therapists SET ${setClause} WHERE id = ?`)
    .run(...fields.map((f) => data[f]), id);
  return getTherapistById(id);
}
