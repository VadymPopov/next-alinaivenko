interface AppointmentType {
  date: string;
  slot: string;
  duration: number;
}

export default function convertToDate(appointment: AppointmentType): Date {
  const [year, month, day] = appointment.date.split('-').map(Number);

  let hours = Number(appointment.slot.replace(/(am|pm)/i, '').split(':')[0]);
  const minutes = Number(
    appointment.slot.replace(/(am|pm)/i, '').split(':')[1],
  );

  if (/pm/i.test(appointment.slot) && hours !== 12) {
    hours += 12;
  } else if (/am/i.test(appointment.slot) && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes);
}
