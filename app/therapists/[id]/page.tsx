import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTherapistById } from '@/lib/therapists';

export default async function TherapistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = getTherapistById(Number(id));
  if (!therapist) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/therapists" className="text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
          ← All Therapists
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">{therapist.name}</h1>
        <Link
          href={`/therapists/${therapist.id}/edit`}
          className="border border-zinc-300 text-zinc-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-zinc-100 transition-colors shrink-0"
        >
          Edit
        </Link>
      </div>

      <dl className="space-y-6">
        <div>
          <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Specialty</dt>
          <dd className="text-sm text-teal-700 font-medium">{therapist.specialty}</dd>
        </div>
        {therapist.bio && (
          <div>
            <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Bio</dt>
            <dd className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{therapist.bio}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Joined</dt>
          <dd className="text-sm text-zinc-500 font-mono">{therapist.created_at}</dd>
        </div>
      </dl>
    </div>
  );
}
