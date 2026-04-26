import Link from 'next/link';
import { getAllAgents } from '@/lib/agents';
import { getAllTherapists } from '@/lib/therapists';
import { createAppointmentAction } from '../actions';

export const dynamic = 'force-dynamic';

export default function NewAppointmentPage() {
  const agents = getAllAgents();
  const therapists = getAllTherapists();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/appointments" className="text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
          ← Appointments
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">New Appointment</h1>

      <form action={createAppointmentAction} className="space-y-6 max-w-lg">
        <div>
          <label
            htmlFor="agent_id"
            className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
          >
            Agent
          </label>
          <select
            id="agent_id"
            name="agent_id"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
          >
            <option value="">Select an agent…</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="therapist_id"
            className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
          >
            Therapist
          </label>
          <select
            id="therapist_id"
            name="therapist_id"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
          >
            <option value="">Select a therapist…</option>
            {therapists.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="scheduled_at"
            className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
          >
            Date &amp; Time
          </label>
          <input
            id="scheduled_at"
            name="scheduled_at"
            type="datetime-local"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Optional intake notes…"
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-teal-700 text-white px-5 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
          >
            Book
          </button>
          <a
            href="/appointments"
            className="border border-zinc-300 text-zinc-600 px-5 py-2 rounded text-sm font-medium hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
