import useSWR from 'swr';

import { getFetcher } from '../lib/axiosInstance';

interface UseBlockedDatesResult {
  dates: string[];
  isLoading: boolean;
  isError: boolean;
}
export default function useBlockedDates(
  currentDate: Date = new Date(),
): UseBlockedDatesResult {
  const currentMonth = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });
  const url = `/api/admin/calendar?month=${currentMonth}&year=${currentYear}`;

  const { data, error, isLoading } = useSWR<string[]>(url, getFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 60000,
  });
  return {
    dates: data || [],
    isLoading,
    isError: error,
  };
}
