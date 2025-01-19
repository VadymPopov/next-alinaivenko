import { filterDate } from '@/utils/helpers';

import { addDays } from 'date-fns';

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
