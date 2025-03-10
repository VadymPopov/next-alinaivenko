import { getFetcher } from '@/lib/axiosFetchers';

export async function getFirstAvailableDate(duration: string) {
  try {
    return await getFetcher<{
      date: string;
      blockedDates: string[];
      slots: string[];
    }>(`/api/admin/calendar/available-date?duration=${duration}`);
  } catch (error) {
    console.error('Error fetching first available date:', error);
    return {
      date: '',
      blockedDates: [],
      slots: [],
    };
  }
}
