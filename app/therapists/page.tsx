import Link from 'next/link';
import { getAllTherapists } from '@/lib/therapists';

export const dynamic = 'force-dynamic';

export default function TherapistsPage() {
  const therapists = getAllTherapists();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Therapists</h1>
        <Link
          href="/therapists/new"
          className="bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          New Therapist
        </Link>
      </div>

      {therapists.length === 0 ? (
        <div className="text-center py-24 text-zinc-400">
          <p className="text-lg mb-2">No therapists on staff yet.</p>
          <p className="text-sm mb-6">The clinic is short-staffed. Perhaps by design.</p>
          <Link href="/therapists/new" className="text-teal-700 text-sm underline hover:text-teal-800">
            Add the first therapist
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {therapists.map((t) => (
            <Link
              key={t.id}
              href={`/therapists/${t.id}`}
              className="bg-white border border-zinc-200 rounded-lg p-5 hover:border-zinc-300 hover:shadow-sm transition-all"
            >
              <p className="text-sm font-semibold text-zinc-900 mb-1">{t.name}</p>
              <p className="text-xs text-teal-700 font-medium">{t.specialty}</p>
              {t.bio && (
                <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">{t.bio}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
