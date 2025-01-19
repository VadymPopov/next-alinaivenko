import { getFetcher, postFetcher, putFetcher } from '@/lib/axiosFetchers';
import { MaxDate, StudioInfo } from '@/types';

import { KeyedMutator } from 'swr';

const CALENDAR_API = '/api/admin/calendar';

const formatDates = (dates: Date[]) =>
  dates
    .filter((date) => !isNaN(date.getTime()))
    .map((date) => date.toISOString())
    .sort();

export async function getMaxDate() {
  return await getFetcher<MaxDate>(`${CALENDAR_API}/max-date`);
}

export async function getBlockedDates() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });

  return await getFetcher<string[]>(
    `${CALENDAR_API}?month=${currentMonth}&year=${currentYear}`,
  );
}

export async function getStudioInfo() {
  return await getFetcher<StudioInfo>(`${CALENDAR_API}/studio`);
}

export async function isBlockedMonthExists(month: string, year: string) {
  return await getFetcher<{ exists: boolean }>(
    `${CALENDAR_API}?isExists=true&month=${month}&year=${year}`,
  );
}

export const updateBlockedDates = async (
  newDates: Date[],
  mutate: KeyedMutator<string[]>,
  currentMonth: string,
  currentYear: string,
) => {
  const formattedDates = formatDates(newDates);

  try {
    const { exists }: { exists: boolean } = await isBlockedMonthExists(
      currentMonth,
      currentYear,
    );

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
