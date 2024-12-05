import { addMinutes, format, parse } from 'date-fns';

export const convertToTimeRange = (
  startTime: string,
  durationInMinutes: number,
) => {
  const normalizedTime = startTime.replace(/(am|pm)$/i, ' $1').toUpperCase();

  const start = parse(normalizedTime, 'h:mm a', new Date());

  const end = addMinutes(start, durationInMinutes);

  const formattedStart = format(start, 'HH:mm');
  const formattedEnd = format(end, 'HH:mm');

  return `${formattedStart} - ${formattedEnd}`;
};
