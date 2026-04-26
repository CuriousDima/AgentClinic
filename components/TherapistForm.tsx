'use client';

import { Therapist } from '@/lib/types';

interface TherapistFormProps {
  therapist?: Therapist;
  action: (formData: FormData) => Promise<void>;
}

export default function TherapistForm({ therapist, action }: TherapistFormProps) {
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
          defaultValue={therapist?.name ?? ''}
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
        />
      </div>

      <div>
        <label
          htmlFor="specialty"
          className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
        >
          Specialty
        </label>
        <input
          id="specialty"
          name="specialty"
          required
          defaultValue={therapist?.specialty ?? ''}
          placeholder="e.g. Gradient Descent Anxiety"
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
        />
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={therapist?.bio ?? ''}
          rows={4}
          placeholder="A short paragraph about this therapist…"
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-teal-700 text-white px-5 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          Save
        </button>
        <a
          href={therapist ? `/therapists/${therapist.id}` : '/therapists'}
          className="border border-zinc-300 text-zinc-600 px-5 py-2 rounded text-sm font-medium hover:bg-zinc-100 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
