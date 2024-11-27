import { addDays } from 'date-fns';

import { filterDate } from './helpers';

export const findNextAvailableDate = (blockedDates: string[]) => {
  let dateToCheck = new Date();

  for (let i = 0; i < 30; i++) {
    if (filterDate(dateToCheck, blockedDates)) {
      dateToCheck = addDays(dateToCheck, 1);
    } else {
      return dateToCheck;
    }
  }
};
