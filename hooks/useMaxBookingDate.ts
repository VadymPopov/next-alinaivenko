import { getFetcher, postFetcher, putFetcher } from '@/lib/axiosFetchers';
import { MaxDate } from '@/types';

import useSWR from 'swr';

const CALENDAR_API = '/api/admin/calendar/max-date';

export function useMaxBookingDate(fallbackData: MaxDate) {
  const { data, error, mutate, isLoading } = useSWR<MaxDate>(
    CALENDAR_API,
    getFetcher,
    {
      fallbackData,
      revalidateIfStale: false,
      revalidateOnMount: false,
    },
  );

  const updateMaxBookingDate = async (updatedData: MaxDate) => {
    const method = updatedData._id ? 'PUT' : 'POST';
    const queryString = updatedData._id ? `?id=${updatedData._id}` : '';
    const url = `${CALENDAR_API}${queryString}`;

    try {
      const fetcher = method === 'POST' ? postFetcher : putFetcher;
      await fetcher(url, updatedData);

      mutate(updatedData, {
        optimisticData: updatedData,
        revalidate: false,
        rollbackOnError: true,
      });
    } catch (error) {
      console.error('Error updating max booking date:', error);
      throw new Error('Failed to update max booking date');
    }
  };

  return { data, error, mutate: updateMaxBookingDate, isLoading };
}
