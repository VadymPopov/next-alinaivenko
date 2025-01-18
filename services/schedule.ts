import { getFetcher } from '@/lib/axiosFetchers';

export async function getFirstAvailableDate(duration: string) {
  return await getFetcher<{
    date: string;
    blockedDates: string[];
    slots: string[];
  }>(`/api/admin/calendar/available-date?duration=${duration}`);
}
