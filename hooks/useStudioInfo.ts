import { getFetcher, postFetcher, putFetcher } from '@/lib/axiosFetchers';
import { StudioInfo } from '@/types';

import useSWR from 'swr';

const STUDIO_API = '/api/admin/calendar/studio';

export function useStudioInfo(fallbackData?: {
  _id: string;
  address: string;
  city: string;
  name: string;
  latitude: string;
  longitude: string;
}) {
  const { data, mutate, error, isLoading, isValidating } = useSWR(
    STUDIO_API,
    getFetcher,
    {
      fallbackData,
      revalidateOnMount: false,
      revalidateIfStale: true,
    },
  );

  const updateStudioInfo = async (studioInfo: {
    id?: string;
    address: string;
    city: string;
    name: string;
    latitude: string;
    longitude: string;
  }) => {
    try {
      const fetcher = studioInfo.id ? putFetcher : postFetcher;
      const studioApiUrl = `${STUDIO_API}?id=${studioInfo.id}`;
      await fetcher(studioApiUrl, studioInfo);
      mutate(studioInfo, {
        optimisticData: studioInfo,
        revalidate: true,
        rollbackOnError: true,
      });
    } catch (error) {
      console.error('Error updating studio info:', error);
      throw error;
    }
  };

  return {
    data: data as StudioInfo,
    error,
    isLoading,
    updateStudioInfo,
    isValidating,
  };
}
