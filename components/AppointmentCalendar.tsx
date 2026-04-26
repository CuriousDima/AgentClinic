'use client';

import dynamic from 'next/dynamic';
import type { AppointmentWithNames } from '@/lib/types';

const BigCalendarInner = dynamic(() => import('./BigCalendarInner'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-zinc-50 rounded animate-pulse flex items-center justify-center">
      <span className="text-zinc-400 text-sm">Loading calendar…</span>
    </div>
  ),
});

interface Props {
  appointments: AppointmentWithNames[];
}

export default function AppointmentCalendar({ appointments }: Props) {
  return (
    <div className="h-[600px]">
      <BigCalendarInner appointments={appointments} />
    </div>
  );
}
