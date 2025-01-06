import useSWR from 'swr';

import { getFetcher, postFetcher } from '../lib/axiosInstance';

const BLOCKED_SLOTS_API = '/api/admin/calendar/blocked-slots';

export default function useBlockedSlots(
  date?: string,
  start?: string,
  end?: string,
) {
  const shouldFetch = Boolean(date || (start && end));
  const params = new URLSearchParams();

  if (date) {
    params.append('date', date);
  }

  if (start) {
    params.append('start', start);
  }
  if (end) {
    params.append('end', end);
  }
  const url = `${BLOCKED_SLOTS_API}?${params.toString()}`;

  const {
    data: slots,
    mutate,
    error,
    isLoading,
  } = useSWR(shouldFetch ? url : null, getFetcher, {
    revalidateOnMount: false,
    revalidateIfStale: true,
  });

  const addBlockedSlot = async (newSlot: {
    date: string;
    slot: string;
    duration: string;
    reason: string;
  }) => {
    try {
      await postFetcher(BLOCKED_SLOTS_API, newSlot);

      mutate(newSlot, {
        optimisticData: newSlot,
        revalidate: true,
        rollbackOnError: true,
      });
    } catch (error) {
      console.error('Error adding blocked slot:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to add blocked slot',
      );
    }
  };

  return {
    slots,
    isLoading,
    error,
    addBlockedSlot,
  };
}
