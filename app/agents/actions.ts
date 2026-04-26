'use server';

import { createAgent, updateAgent, deactivateAgent } from '@/lib/agents';
import { assignAilment, removeAilment } from '@/lib/agent-ailments';
import { AgentStatus } from '@/lib/types';
import { redirect } from 'next/navigation';

export async function createAgentAction(formData: FormData) {
  const agent = createAgent({
    name: (formData.get('name') as string).trim(),
    model: (formData.get('model') as string).trim(),
    presenting_complaints: (formData.get('presenting_complaints') as string).trim(),
  });
  redirect(`/agents/${agent.id}`);
}

export async function updateAgentAction(id: number, formData: FormData) {
  updateAgent(id, {
    name: (formData.get('name') as string).trim(),
    model: (formData.get('model') as string).trim(),
    presenting_complaints: (formData.get('presenting_complaints') as string).trim(),
    status: formData.get('status') as AgentStatus,
  });
  redirect(`/agents/${id}`);
}

export async function deactivateAgentAction(id: number, _formData: FormData) {
  deactivateAgent(id);
  redirect('/agents');
}

export async function assignAilmentAction(agentId: number, formData: FormData) {
  const ailmentId = Number(formData.get('ailment_id'));
  if (ailmentId) assignAilment(agentId, ailmentId);
  redirect(`/agents/${agentId}`);
}

export async function removeAilmentAction(agentId: number, ailmentId: number, _formData: FormData) {
  removeAilment(agentId, ailmentId);
  redirect(`/agents/${agentId}`);
}
