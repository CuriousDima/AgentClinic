import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAgentById } from '@/lib/agents';
import { getAllAilments } from '@/lib/ailments';
import { getAilmentsForAgent } from '@/lib/agent-ailments';
import { AgentStatus } from '@/lib/types';
import { deactivateAgentAction, assignAilmentAction, removeAilmentAction } from '../actions';

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = getAgentById(Number(id));
  if (!agent) notFound();

  const assignedAilments = getAilmentsForAgent(agent.id);
  const assignedIds = new Set(assignedAilments.map((a) => a.id));
  const availableAilments = getAllAilments().filter((a) => !assignedIds.has(a.id));

  const deactivate = deactivateAgentAction.bind(null, agent.id);
  const assignAilment = assignAilmentAction.bind(null, agent.id);

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

      <dl className="space-y-6 mb-10">
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

      {/* Ailments section */}
      <div className="border-t border-zinc-200 pt-8">
        <h2 className="text-base font-semibold text-zinc-900 mb-4">Ailments</h2>

        {assignedAilments.length === 0 ? (
          <p className="text-sm text-zinc-400 mb-6">
            No ailments on record. A clean bill of health — or denial.
          </p>
        ) : (
          <ul className="space-y-4 mb-6">
            {assignedAilments.map((ailment) => {
              const removeAction = removeAilmentAction.bind(null, agent.id, ailment.id);
              return (
                <li
                  key={ailment.id}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-800">{ailment.name}</p>
                      {ailment.therapies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {ailment.therapies.map((t) => (
                            <span
                              key={t.id}
                              className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <form action={removeAction} className="shrink-0">
                      <button
                        type="submit"
                        className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {availableAilments.length > 0 && (
          <form action={assignAilment} className="flex gap-2">
            <select
              name="ailment_id"
              className="flex-1 text-sm border border-zinc-300 rounded px-3 py-1.5 text-zinc-700 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="">Select an ailment…</option>
              {availableAilments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
            >
              Assign
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
