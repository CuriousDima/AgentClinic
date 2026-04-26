import Link from 'next/link';
import AgentForm from '@/components/AgentForm';
import { generateAgentName } from '@/lib/agent-name';
import { createAgentAction } from '../actions';

export default function NewAgentPage() {
  const defaultName = generateAgentName();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/agents" className="text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
          ← All Agents
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">New Agent</h1>
      <AgentForm defaultName={defaultName} action={createAgentAction} />
    </div>
  );
}
