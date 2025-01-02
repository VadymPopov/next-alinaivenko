import { addDays } from 'date-fns';

import { filterDate } from './helpers';

interface AvailabilableDateParams {
  date: Date;
  blockedDates: string[];
}

export const findNextAvailableDate = ({
  date = new Date(),
  blockedDates,
}: AvailabilableDateParams) => {
  let dateToCheck = date;

  for (let i = 0; i < 31; i++) {
    if (filterDate(dateToCheck, blockedDates)) {
      dateToCheck = addDays(dateToCheck, 1);
    } else {
      return dateToCheck;
    }
  }
};
