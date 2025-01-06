import { KeyedMutator } from 'swr';

import { postFetcher, putFetcher } from './axiosInstance';

const CALENDAR_API = '/api/admin/calendar';

const formatDates = (dates: Date[]) =>
  dates
    .filter((date) => !isNaN(date.getTime()))
    .map((date) => date.toISOString())
    .sort();

export const updateBlockedDates = async (
  newDates: Date[],
  mutate: KeyedMutator<string[]>,
  currentMonth: string,
  currentYear: string,
) => {
  const formattedDates = formatDates(newDates);

  try {
    const response = await fetch(
      `${CALENDAR_API}?isExists=true&month=${currentMonth}&year=${currentYear}`,
    );
    const { exists }: { exists: boolean } = await response.json();
    const method = exists ? 'PUT' : 'POST';

    const body = {
      year: currentYear,
      month: currentMonth,
      blockedDates: formattedDates,
    };
    const url = exists
      ? `${CALENDAR_API}?month=${currentMonth}&year=${currentYear}`
      : CALENDAR_API;

    const fetcher = method === 'POST' ? postFetcher : putFetcher;
    await fetcher(url, body);

    mutate(formattedDates, {
      optimisticData: formattedDates,
      revalidate: true,
      rollbackOnError: true,
    });
  } catch (error) {
    console.error('Error updating blocked dates:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update blocked dates',
    );
  }
};
