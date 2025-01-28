'use client';

import { getFetcher, postFetcher, putFetcher } from '@/lib/axiosFetchers';
import { handleOptimisticMutate } from '@/utils';

import { isAfter, parseISO, startOfDay } from 'date-fns';
import useSWR from 'swr';

const CALENDAR_API = '/api/admin/calendar';

const formatDates = (dates: Date[]) =>
  dates
    .filter((date) => !isNaN(date.getTime()))
    .map((date) => date.toISOString())
    .sort();

export function useBlockedDates(currentDate: Date = new Date()) {
  const currentMonth = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });

  const url = `${CALENDAR_API}?month=${currentMonth}&year=${currentYear}`;

  const { data, mutate, error, isLoading } = useSWR<string[]>(url, getFetcher, {
    revalidateOnMount: false,
    revalidateIfStale: true,
  });

  const updateBlockedDates = async (newDates: Date[]) => {
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

      handleOptimisticMutate(mutate, (cachedData) => {
        const existingDates = cachedData || [];
        const updatedDates = Array.from(
          new Set([...existingDates, ...formattedDates]),
        );
        return updatedDates.sort();
      });
    } catch (error) {
      console.error('Error updating blocked dates:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to update blocked dates',
      );
    }
  };

  const now = startOfDay(new Date());
  const futureOrEqualDates = (data || []).filter((dateString) => {
    const parsedDate = startOfDay(parseISO(dateString));
    return isAfter(parsedDate, now) || parsedDate.getTime() === now.getTime();
  });

  return {
    dates: futureOrEqualDates,
    isLoading,
    error,
    mutate: updateBlockedDates,
  };
}
