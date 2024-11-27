'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchemaSetMaxBookingDate } from '../schemas';
import Button from './Button';
import DatePickerField from './DatePickerField';

interface FormValues {
  date: Date;
}

export interface MaxDate {
  _id: string;
  date: Date;
}

export default function SetMaxBookingDateForm() {
  const [maxDate, setMaxDate] = useState<MaxDate>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMaxDate = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/admin/calendar/max-date`);
        if (!response.ok) throw new Error('Failed to fetch max date');
        const data = await response.json();
        setMaxDate(data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : 'Error fetching date.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaxDate();
  }, []);

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaSetMaxBookingDate),
    defaultValues: {
      date: new Date(),
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (maxDate) {
      methods.reset({
        date: maxDate?.date && new Date(maxDate.date),
      });
    }
  }, [maxDate, methods]);

  const watchDate = watch('date');

  const onSubmitHandler = async (formValues: FormValues) => {
    try {
      setIsLoading(true);
      const id = maxDate?._id;
      const method = id ? 'PUT' : 'POST';

      const queryParams = new URLSearchParams();
      if (id) queryParams.append('id', id);

      const res = await fetch(
        `/api/admin/calendar/max-date?${queryParams.toString()}`,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formValues }),
        },
      );
      if (!res.ok) throw new Error(await res.text());
      toast.success('Max booking date was successfully updated!', {
        duration: 3000,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex py-4 px-8 justify-between"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h2 className="text-accentColor font-semibold text-2xl">
          Maximum Booking Date
        </h2>
        <div className="flex gap-10 items-start">
          <DatePickerField<FormValues>
            name="date"
            control={control}
            error={errors.date?.message}
            bday={false}
            minDate={new Date()}
            admin={true}
          />
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              isProcessing={isLoading}
              disabled={
                Object.keys(errors).length !== 0 ||
                isLoading ||
                watchDate === maxDate?.date
              }
            >
              {isLoading ? 'Setting...' : 'Set'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
