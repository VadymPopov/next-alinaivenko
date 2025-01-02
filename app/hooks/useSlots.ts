import useSWR from 'swr';

import { getFetcher } from '../lib/axiosInstance';

interface UseSlotsParams {
  date: string;
  duration: number;
  isInitial?: boolean;
  isEditing?: boolean;
  id?: string;
}

interface useSlotsResult {
  slots: string[];
  isLoading: boolean;
  isError: boolean;
}

export default function useSlots({
  date,
  duration,
  isInitial,
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

  const url = !isInitial ? `/api/slots?${params.toString()}` : null;

  const { data, error, isLoading } = useSWR<string[]>(url, getFetcher);

  return {
    slots: data || [],
    isLoading,
    isError: error,
  };
}
