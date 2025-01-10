import useSWR from 'swr';

import { IBlockedSlot } from '../components/WeekView';
import { deleteFetcher, getFetcher, postFetcher } from '../lib/axiosInstance';
import { handleOptimisticMutate } from '../utils/mutateHelper';

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
    isValidating,
  } = useSWR<IBlockedSlot[] | undefined>(shouldFetch ? url : null, getFetcher, {
    revalidateOnMount: false,
    revalidateIfStale: true,
  });

  const addBlockedSlot = async (newSlot: {
    date: string;
    slot: string;
    duration: number;
    reason: string;
  }) => {
    const tempSlot: IBlockedSlot = { _id: '', ...newSlot };

    try {
      handleOptimisticMutate(mutate, (cachedData) =>
        cachedData ? [...cachedData, tempSlot] : [tempSlot],
      );
      await postFetcher(BLOCKED_SLOTS_API, newSlot);
      mutate();
    } catch (error) {
      console.error('Error adding blocked slot:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to add blocked slot',
      );
    }
  };

  const deleteBlockedSlot = async (id: string) => {
    const blockedSlotApiUrl = `${BLOCKED_SLOTS_API}?id=${id}`;

    try {
      handleOptimisticMutate(
        mutate,
        (cachedData) => cachedData?.filter((slot) => slot._id !== id) || [],
      );
      await deleteFetcher(blockedSlotApiUrl);
      mutate();
    } catch (error) {
      console.error('Error deleting blocked slot:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to delete blocked slot',
      );
    }
  };

  return {
    slots,
    isLoading,
    isValidating,
    error,
    addBlockedSlot,
    deleteBlockedSlot,
  };
}
