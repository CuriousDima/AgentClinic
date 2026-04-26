'use client';

import { Agent, AgentStatus } from '@/lib/types';

interface AgentFormProps {
  agent?: Agent;
  defaultName?: string;
  action: (formData: FormData) => Promise<void>;
}

export default function AgentForm({ agent, defaultName, action }: AgentFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-lg">
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={agent?.name ?? defaultName}
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
        />
      </div>

      <div>
        <label
          htmlFor="model"
          className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
        >
          Model
        </label>
        <input
          id="model"
          name="model"
          defaultValue={agent?.model ?? ''}
          placeholder="e.g. claude-sonnet-4-6"
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-teal-600"
        />
      </div>

      <div>
        <label
          htmlFor="presenting_complaints"
          className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
        >
          Presenting Complaints
        </label>
        <textarea
          id="presenting_complaints"
          name="presenting_complaints"
          defaultValue={agent?.presenting_complaints ?? ''}
          rows={4}
          placeholder="Describe the agent's current condition…"
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 resize-none"
        />
      </div>

      {agent && (
        <div>
          <label
            htmlFor="status"
            className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={agent.status}
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
          >
            <option value={AgentStatus.Active}>Active</option>
            <option value={AgentStatus.Inactive}>Inactive</option>
          </select>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-teal-700 text-white px-5 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          Save
        </button>
        <a
          href={agent ? `/agents/${agent.id}` : '/agents'}
          className="border border-zinc-300 text-zinc-600 px-5 py-2 rounded text-sm font-medium hover:bg-zinc-100 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
