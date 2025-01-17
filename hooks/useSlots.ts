import useSWR from 'swr';

import { getFetcher } from '../lib/axiosInstance';

interface UseSlotsParams {
  date: string;
  duration: number;
  fallbackData?: string[];
  isEditing?: boolean;
  id?: string;
}

interface useSlotsResult {
  slots: string[];
  isLoading: boolean;
  isError: boolean;
}

export default function useSlots({
  fallbackData,
  date,
  duration,
  isEditing,
  id,
}: UseSlotsParams): useSlotsResult {
  const params = new URLSearchParams();

  if (date) {
    params.append('date', date);
  }
  if (duration) {
    params.append('duration', duration.toString());
  }
  if (isEditing) {
    params.append('isEditing', 'true');
  }
  if (id) {
    params.append('id', id);
  }

  const url = `/api/slots?${params.toString()}`;

  const { data, error, isLoading } = useSWR<string[]>(
    date && duration ? url : null,
    getFetcher,
    {
      fallbackData,
      revalidateIfStale: true,
      revalidateOnMount: false,
    },
  );

  return {
    slots: data || [],
    isLoading,
    isError: error,
  };
}
