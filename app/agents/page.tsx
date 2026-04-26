import Link from 'next/link';
import { getAllAgents } from '@/lib/agents';

export const dynamic = 'force-dynamic';
import { AgentStatus } from '@/lib/types';

export default function AgentsPage() {
  const agents = getAllAgents();
  const activeCount = agents.filter((a) => a.status === AgentStatus.Active).length;
  const inactiveCount = agents.filter((a) => a.status === AgentStatus.Inactive).length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Agents</h1>
          {agents.length > 0 && (
            <p className="text-zinc-400 text-sm mt-1 font-mono">
              {activeCount} active · {inactiveCount} inactive
            </p>
          )}
        </div>
        <Link
          href="/agents/new"
          className="bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          New Agent
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-24 text-zinc-400">
          <p className="text-lg mb-2">The waiting room is empty.</p>
          <p className="text-sm mb-6">No agents have checked in yet. They&apos;re probably fine.</p>
          <Link href="/agents/new" className="text-teal-700 text-sm underline hover:text-teal-800">
            Register the first agent
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className={`bg-white border border-zinc-200 rounded-lg p-5 hover:border-zinc-300 hover:shadow-sm transition-all ${
                agent.status === AgentStatus.Inactive ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-medium text-zinc-900 text-sm leading-tight">{agent.name}</h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono shrink-0 ml-2 ${
                    agent.status === AgentStatus.Active
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {agent.status}
                </span>
              </div>
              {agent.model && (
                <p className="text-xs text-zinc-400 font-mono mb-2 truncate">{agent.model}</p>
              )}
              {agent.presenting_complaints && (
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {agent.presenting_complaints}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
