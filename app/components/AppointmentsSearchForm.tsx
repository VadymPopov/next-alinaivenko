'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';

import { IDate } from '../admin/appointments/page';
import { generateDays, monthMap } from '../utils/helpers';
import AdminTitle from './AdminTitle';
import { IAppointment } from './AppointmentDetails';
import Button from './Button';
import InputField from './InputField';
import SelectField from './Select';

type daysOptionsType = {
  label: string;
  value: string;
};

interface FormValues {
  day?: string;
  month?: string;
  year?: number;
}

const monthOptions = Object.keys(monthMap).map((month) => ({
  value: String(monthMap[month]).padStart(2, '0'),
  label: month,
}));

export default function AppointmentsSearchForm({
  setAppointments,
  setDate,
}: {
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  setDate: React.Dispatch<React.SetStateAction<IDate>>;
}) {
  const [daysOptions, setDaysOptions] = useState<daysOptionsType[]>([]);

  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      day: '',
      month: '',
      year: new Date().getFullYear(),
    },
  });

  const { handleSubmit, control, watch } = methods;

  const year = watch('year');
  const month = watch('month');

  useEffect(() => {
    const updatedDays = generateDays(year, month);
    setDaysOptions(updatedDays);
  }, [year, month]);

  const onSubmitHandler = async (formValues: FormValues) => {
    const { day, month, year } = formValues;
    setDate({
      day: Number(day),
      month: Number(month),
      year,
    });
    try {
      const queryParams = new URLSearchParams();

      if (day) queryParams.append('day', day);
      if (month) queryParams.append('month', month);
      if (year) queryParams.append('year', year.toString());

      const query = queryParams.toString();
      const response = await fetch(`/api/appointments?${query}`);
      const appointments = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setAppointments(appointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex py-2.5 px-4 md:py-4 md:px-8 justify-between gap-2.5 lg:gap-5 flex-wrap flex-col md:flex-row"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <AdminTitle title="Search Appointments by Date" />
        <div className="flex gap-2.5 lg:items-start flex-col sm:flex-row ">
          <div className="flex gap-2.5">
            <InputField
              styles="w-24 px-3 py-2.5"
              admin={true}
              name="year"
              type="number"
              placeholder="Year"
              title="Year"
            />
            <SelectField
              admin={true}
              name="month"
              control={control}
              placeholder="Month"
              options={monthOptions}
              isClearable={true}
            />
          </div>
          <div className="flex gap-2.5 justify-center sm:justify-normal">
            <SelectField
              admin={true}
              name="day"
              control={control}
              placeholder="Day"
              options={daysOptions}
              isClearable={true}
            />
            <div className="flex justify-center items-center text-s">
              <Button type="submit" styles="p-2">
                <MdSearch size={24} />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
