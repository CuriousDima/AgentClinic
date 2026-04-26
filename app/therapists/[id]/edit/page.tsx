import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTherapistById } from '@/lib/therapists';
import TherapistForm from '@/components/TherapistForm';
import { updateTherapistAction } from '../../actions';

export default async function EditTherapistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = getTherapistById(Number(id));
  if (!therapist) notFound();

  const updateAction = updateTherapistAction.bind(null, therapist.id);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          href={`/therapists/${therapist.id}`}
          className="text-zinc-400 text-sm hover:text-zinc-600 transition-colors"
        >
          ← {therapist.name}
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">Edit Therapist</h1>
      <TherapistForm therapist={therapist} action={updateAction} />
    </div>
  );
}
