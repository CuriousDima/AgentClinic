'use server';

import { createAppointment } from '@/lib/appointments';
import { redirect } from 'next/navigation';

export async function createAppointmentAction(formData: FormData) {
  createAppointment({
    agent_id: Number(formData.get('agent_id')),
    therapist_id: Number(formData.get('therapist_id')),
    scheduled_at: (formData.get('scheduled_at') as string).replace('T', ' '),
    notes: ((formData.get('notes') as string) ?? '').trim(),
  });
  redirect('/appointments');
}
