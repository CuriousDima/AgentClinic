import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAgentById } from '@/lib/agents';
import AgentForm from '@/components/AgentForm';
import { updateAgentAction } from '../../actions';

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = getAgentById(Number(id));
  if (!agent) notFound();

  const updateAction = updateAgentAction.bind(null, agent.id);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          href={`/agents/${agent.id}`}
          className="text-zinc-400 text-sm hover:text-zinc-600 transition-colors"
        >
          ← {agent.name}
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">Edit Agent</h1>
      <AgentForm agent={agent} action={updateAction} />
    </div>
  );
}
