'use client';

import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { AppointmentWithNames } from '@/lib/types';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

interface Props {
  appointments: AppointmentWithNames[];
}

export default function BigCalendarInner({ appointments }: Props) {
  const events = appointments.map((a) => {
    const start = new Date(a.scheduled_at.replace(' ', 'T'));
    return {
      id: a.id,
      title: `${a.agent_name} with ${a.therapist_name}`,
      start,
      end: new Date(start.getTime() + 60 * 60 * 1000),
    };
  });

  return (
    <Calendar
      localizer={localizer}
      events={events}
      defaultView={Views.WEEK}
      views={[Views.WEEK, Views.MONTH, Views.AGENDA]}
      style={{ height: '100%' }}
    />
  );
}
