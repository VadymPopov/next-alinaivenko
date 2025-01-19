'use client';

import { AdminTitle } from '@/components/admin';
import { Button, InputField, SelectField } from '@/components/ui';
import { MONTH_OPTIONS } from '@/constants';
import { Options, SearchDate } from '@/types';
import { generateDays } from '@/utils/helpers';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';

export function AppointmentsSearchForm({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<SearchDate>>;
}) {
  const [daysOptions, setDaysOptions] = useState<Options[]>([]);

  const methods = useForm<SearchDate>({
    mode: 'all',
    defaultValues: {
      year: new Date().getFullYear(),
    },
  });

  const { handleSubmit, control, watch } = methods;

  const year = watch('year');
  const month = watch('month');

  useEffect(() => {
    if (!month || !year) return;
    const updatedDays = generateDays(year, month);
    setDaysOptions(updatedDays);
  }, [year, month]);

  const onSubmitHandler = async (formValues: SearchDate) => {
    const { day, month, year } = formValues;
    setDate({
      day,
      month,
      year,
    });
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
              options={MONTH_OPTIONS}
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
