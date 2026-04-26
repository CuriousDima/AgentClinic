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

export interface Therapist {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  created_at: string;
}

export interface Appointment {
  id: number;
  agent_id: number;
  therapist_id: number;
  scheduled_at: string;
  notes: string;
  created_at: string;
}

export interface AppointmentWithNames extends Appointment {
  agent_name: string;
  therapist_name: string;
}
