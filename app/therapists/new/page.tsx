import Link from 'next/link';
import TherapistForm from '@/components/TherapistForm';
import { createTherapistAction } from '../actions';

export default function NewTherapistPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/therapists" className="text-zinc-400 text-sm hover:text-zinc-600 transition-colors">
          ← All Therapists
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">New Therapist</h1>
      <TherapistForm action={createTherapistAction} />
    </div>
  );
}
