export const AgentStatus = {
  Active: 'active',
  Inactive: 'inactive',
} as const;
export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus];

export interface Agent {
  id: number;
  name: string;
  model: string;
  presenting_complaints: string;
  status: AgentStatus;
  created_at: string;
}

export interface Ailment {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Therapy {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface AilmentWithTherapies extends Ailment {
  therapies: Therapy[];
}
