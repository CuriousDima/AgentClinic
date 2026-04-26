'use server';

import { createTherapist, updateTherapist } from '@/lib/therapists';
import { redirect } from 'next/navigation';

export async function createTherapistAction(formData: FormData) {
  const therapist = createTherapist({
    name: (formData.get('name') as string).trim(),
    specialty: (formData.get('specialty') as string).trim(),
    bio: (formData.get('bio') as string).trim(),
  });
  redirect(`/therapists/${therapist.id}`);
}

export async function updateTherapistAction(id: number, formData: FormData) {
  updateTherapist(id, {
    name: (formData.get('name') as string).trim(),
    specialty: (formData.get('specialty') as string).trim(),
    bio: (formData.get('bio') as string).trim(),
  });
  redirect(`/therapists/${id}`);
}
