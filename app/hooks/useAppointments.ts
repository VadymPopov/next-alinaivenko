import useSWR from 'swr';

import { IAppointment } from '../components/AppointmentDetails';
import {
  deleteFetcher,
  getFetcher,
  postFetcher,
  putFetcher,
} from '../lib/axiosInstance';
import { serviceType } from '../providers/BookingFormContext';
import { handleOptimisticMutate } from '../utils/mutateHelper';

interface IAppointmentEdit {
  _id: string;
  phone?: string | null;
  instagram?: string;
  description?: string;
  name: string;
  email: string;
  date: string;
  service: serviceType;
  slot: string;
  duration: string;
  depositAmount?: number;
  depositTax?: number;
  depositFee?: number;
  depositTotal?: number;
  paymentAmount?: number;
  paymentTax?: number;
  paymentTotal?: number;
  paymentFee?: number;
  tip?: number;
  paymentIntentId?: string;
}

interface NewAppointment extends Omit<IAppointment, '_id'> {}

const APPOINTMENTS_API = '/api/appointments';
const ADMIN_APPOINTMENTS_API = '/api/admin/appointments';

function mapToMongoAppointment(appointment: IAppointmentEdit) {
  return {
    _id: appointment._id,
    name: appointment.name,
    email: appointment.email,
    phone: appointment.phone || '',
    service: appointment.service,
    date: appointment.date,
    slot: appointment.slot,
    duration: Number(appointment.duration),
    description: appointment.description || '',
    instagram: appointment.instagram || '',
    paymentIntentId: appointment.paymentIntentId || '',
    deposit: {
      amount: appointment.depositAmount || 0,
      tax: appointment.depositTax || 0,
      fee: appointment.depositFee || 0,
      total: appointment.depositTotal || 0,
    },
    payment: {
      amount: appointment.paymentAmount || 0,
      tip: appointment.tip || 0,
      fee: appointment.paymentFee || 0,
      tax: appointment.paymentTax || 0,
      total: appointment.paymentTotal || 0,
    },
  };
}

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

export default function useAppointments({
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
  } = useSWR<IAppointment[] | undefined>(
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
    const tempAppointment: IAppointment = { _id: '', ...newAppt };
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

  const updateAppointment = async (updatedAppt: IAppointmentEdit) => {
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
