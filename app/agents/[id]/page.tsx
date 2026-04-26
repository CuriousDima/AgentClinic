import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAgentById } from '@/lib/agents';
import { AgentStatus } from '@/lib/types';
import { deactivateAgentAction } from '../actions';

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = getAgentById(Number(id));
  if (!agent) notFound();

  const deactivate = deactivateAgentAction.bind(null, agent.id);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/agents" className="text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
          ← All Agents
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">{agent.name}</h1>
          <span
            className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-mono ${
              agent.status === AgentStatus.Active
                ? 'bg-teal-100 text-teal-700'
                : 'bg-zinc-100 text-zinc-500'
            }`}
          >
            {agent.status}
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href={`/agents/${agent.id}/edit`}
            className="border border-zinc-300 text-zinc-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-zinc-100 transition-colors"
          >
            Edit
          </Link>
          {agent.status === AgentStatus.Active && (
            <form action={deactivate}>
              <button
                type="submit"
                className="border border-zinc-300 text-zinc-500 px-4 py-1.5 rounded text-sm font-medium hover:bg-zinc-100 transition-colors"
              >
                Deactivate
              </button>
            </form>
          )}
        </div>
      </div>

      <dl className="space-y-6">
        <div>
          <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Model</dt>
          <dd className="text-sm text-zinc-800 font-mono">{agent.model || '—'}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">
            Presenting Complaints
          </dt>
          <dd className="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
            {agent.presenting_complaints || '—'}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">
            Registered
          </dt>
          <dd className="text-sm text-zinc-500 font-mono">{agent.created_at}</dd>
        </div>
      </dl>
    </div>
  );
}
