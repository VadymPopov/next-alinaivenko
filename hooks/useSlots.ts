'use client';

import { getFetcher } from '@/lib/axiosFetchers';

import useSWR from 'swr';

const SLOTS_API = '/api/slots';

interface UseSlotsParams {
  date: string;
  duration: number;
  fallbackData?: string[];
  isEditing?: boolean;
  id?: string;
}

export function useSlots({
  fallbackData,
  date,
  duration,
  isEditing,
  id,
}: UseSlotsParams) {
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

  const url = `${SLOTS_API}?${params.toString()}`;

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
