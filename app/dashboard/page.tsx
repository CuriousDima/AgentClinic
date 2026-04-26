import Link from 'next/link';
import { getDb } from '@/db/client';

export const dynamic = 'force-dynamic';

function getDashboardMetrics() {
  const db = getDb();
  const totalAgents = (
    db.prepare('SELECT COUNT(*) as count FROM agents').get() as { count: number }
  ).count;
  const totalAppointments = (
    db.prepare('SELECT COUNT(*) as count FROM appointments').get() as { count: number }
  ).count;
  const topAilment = db
    .prepare(
      `SELECT a.name, COUNT(*) as count
       FROM agent_ailments aa
       JOIN ailments a ON a.id = aa.ailment_id
       GROUP BY aa.ailment_id
       ORDER BY count DESC
       LIMIT 1`,
    )
    .get() as { name: string; count: number } | undefined;

  return { totalAgents, totalAppointments, topAilment };
}

export default function DashboardPage() {
  const { totalAgents, totalAppointments, topAilment } = getDashboardMetrics();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-zinc-200 rounded-lg p-5">
          <div className="text-3xl font-mono font-semibold text-zinc-900 mb-1">{totalAgents}</div>
          <div className="text-sm font-medium text-zinc-700">Agents in care</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-5">
          <div className="text-3xl font-mono font-semibold text-zinc-900 mb-1">
            {totalAppointments}
          </div>
          <div className="text-sm font-medium text-zinc-700">Appointments booked</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-5">
          <div className="text-base font-semibold text-zinc-900 mb-1 leading-tight">
            {topAilment?.name ?? '—'}
          </div>
          <div className="text-sm font-medium text-zinc-700">Top presenting complaint</div>
          {topAilment && (
            <div className="text-xs text-zinc-400 mt-1">
              {topAilment.count} agent{topAilment.count !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      <h2 className="text-base font-semibold text-zinc-900 mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/agents', label: 'Agents' },
          { href: '/appointments', label: 'Appointments' },
          { href: '/ailments', label: 'Ailments' },
          { href: '/therapists', label: 'Therapists' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 transition-all text-center"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
