'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';

import { generateDays, monthMap } from '../utils/helpers';
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
}: {
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
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
        className="text-center flex gap-2.5 justify-center items-center"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
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
      </form>
    </FormProvider>
  );
}
