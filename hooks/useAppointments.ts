import {
  deleteFetcher,
  getFetcher,
  postFetcher,
  putFetcher,
} from '@/lib/axiosFetchers';
import { Appointment, AppointmentEdited, NewAppointment } from '@/types';
import { handleOptimisticMutate } from '@/utils';
import { mapToMongoAppointment } from '@/utils/helpers';

import useSWR from 'swr';

const APPOINTMENTS_API = '/api/appointments';
const ADMIN_APPOINTMENTS_API = '/api/admin/appointments';

interface UseAppointmentsParams {
  date?: string;
  day?: number;
  month?: number;
  year?: number;
  start?: string;
  end?: string;
}

const buildQueryParams = ({
  date,
  day,
  month,
  year,
  start,
  end,
}: UseAppointmentsParams): string => {
  const queryParams = new URLSearchParams();
  if (day) queryParams.append('day', day.toString());
  if (month) queryParams.append('month', month.toString());
  if (year) queryParams.append('year', year.toString());
  if (date) queryParams.append('date', date);
  if (start) queryParams.append('start', start);
  if (end) queryParams.append('end', end);
  return queryParams.toString();
};

export function useAppointments({
  date,
  day,
  month,
  year,
  start,
  end,
}: UseAppointmentsParams = {}) {
  const queryParams = buildQueryParams({ date, day, month, year, start, end });

  const apptsApiUrl = `${start && end ? ADMIN_APPOINTMENTS_API : APPOINTMENTS_API}?${queryParams}`;
  const shouldFetch = Boolean(date || day || month || year || start || end);

  const {
    data: appointments = [],
    mutate,
    error,
    isLoading,
    isValidating,
  } = useSWR<Appointment[] | undefined>(
    shouldFetch ? apptsApiUrl : null,
    getFetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: false,
    },
  );

  const addAppointment = async ({
    url,
    newAppt,
  }: {
    url: string;
    newAppt: NewAppointment;
  }) => {
    const tempAppointment: Appointment = { _id: '', ...newAppt };
    try {
      handleOptimisticMutate(mutate, (cachedData) =>
        cachedData ? [...cachedData, tempAppointment] : [tempAppointment],
      );
      await postFetcher(url, newAppt);
      mutate();
    } catch (error) {
      console.error('Error adding new appointment:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to add new appointment',
      );
    }
  };

  const deleteAppointment = async (id: string) => {
    const apptApiUrl = `${APPOINTMENTS_API}/${id}`;
    try {
      handleOptimisticMutate(
        mutate,
        (cachedData) => cachedData?.filter((appt) => appt._id !== id) || [],
      );
      await deleteFetcher(apptApiUrl);
      mutate();
    } catch (error) {
      console.error('Error deleting an appointment:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to delete an appointment',
      );
    }
  };

  const updateAppointment = async (updatedAppt: AppointmentEdited) => {
    const apptApiUrl = `${APPOINTMENTS_API}/${updatedAppt._id}`;
    const updatedData = mapToMongoAppointment(updatedAppt);

    try {
      handleOptimisticMutate(
        mutate,
        (cachedData) =>
          cachedData?.map((appt) =>
            appt._id === updatedAppt._id ? updatedData : appt,
          ) || [],
      );
      await putFetcher(apptApiUrl, updatedData);
      mutate();
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to update an appointment',
      );
    }
  };

  return {
    appointments,
    isLoading,
    error,
    updateAppointment,
    deleteAppointment,
    addAppointment,
    isValidating,
  };
}
