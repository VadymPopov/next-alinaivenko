import { differenceInYears, format, parse, startOfDay } from 'date-fns';

export const verifyClientLegalAge = (birthdate: Date) => {
  if (!birthdate) {
    throw new Error('Birthdate is required.');
  }

  const date = format(birthdate, 'yyyy-MM-dd');

  const birthDateObj = parse(date, 'yyyy-MM-dd', new Date());

  const currentDate = startOfDay(new Date());

  const age = differenceInYears(currentDate, birthDateObj);

  return age < 18;
};
