import { format } from 'date-fns';
import useSWR from 'swr';

import { IBlockedSlot } from '../components/WeekView';
import { deleteFetcher, getFetcher, postFetcher } from '../lib/axiosInstance';
import { handleOptimisticMutate } from '../utils/mutateHelper';

const BLOCKED_SLOTS_API = '/api/admin/calendar/blocked-slots';

interface UseBlockedSlotsParams {
  date?: string;
  start?: Date;
  end?: Date;
}

const buildQueryParams = ({
  date,
  start,
  end,
}: UseBlockedSlotsParams): string => {
  const queryParams = new URLSearchParams();
  if (date) queryParams.append('date', date);
  if (start) queryParams.append('start', format(start, 'yyyy-MM-dd'));
  if (end) queryParams.append('end', format(end, 'yyyy-MM-dd'));
  return queryParams.toString();
};

export default function useBlockedSlots({
  date,
  start,
  end,
}: UseBlockedSlotsParams = {}) {
  const shouldFetch = Boolean(date || (start && end));
  const queryParams = buildQueryParams({ date, start, end });
  const apiUrl = `${BLOCKED_SLOTS_API}?${queryParams}`;

  const {
    data: slots,
    mutate,
    error,
    isLoading,
    isValidating,
  } = useSWR<IBlockedSlot[] | undefined>(
    shouldFetch ? apiUrl : null,
    getFetcher,
    {
      revalidateOnMount: false,
      revalidateIfStale: true,
    },
  );

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
