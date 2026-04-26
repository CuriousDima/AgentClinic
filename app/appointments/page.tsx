import Link from 'next/link';
import { getAllAppointments } from '@/lib/appointments';
import AppointmentCalendar from '@/components/AppointmentCalendar';

export const dynamic = 'force-dynamic';

export default function AppointmentsPage() {
  const appointments = getAllAppointments();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Appointments</h1>
        <Link
          href="/appointments/new"
          className="bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          New Appointment
        </Link>
      </div>
      <AppointmentCalendar appointments={appointments} />
    </div>
  );
}
