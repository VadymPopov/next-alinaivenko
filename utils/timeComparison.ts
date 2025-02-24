import { isBefore, isEqual, parse, subHours } from 'date-fns';

export const isTimeWithinLastHour = (
  selectedDate: Date,
  timeString: string,
) => {
  const parsedTime = parse(timeString, 'h:mma', new Date());
  const hours = parsedTime.getHours();
  const minutes = parsedTime.getMinutes();

  const newDate = new Date(selectedDate);
  newDate.setHours(hours, minutes, 0, 0);

  const parsedTimeMinusOneHour = subHours(newDate, 1);
  const currentTime = new Date();

  if (
    isBefore(currentTime, parsedTimeMinusOneHour) ||
    isEqual(currentTime, parsedTimeMinusOneHour)
  ) {
    return false;
  } else {
    return true;
  }
};
