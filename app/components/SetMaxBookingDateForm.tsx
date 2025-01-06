'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

import { useMaxBookingDate } from '../hooks/useMaxBookingDate';
import { MaxDate } from '../hooks/useMaxBookingDate';
import { validationSchemaSetMaxBookingDate } from '../schemas';
import AdminTitle from './AdminTitle';
import Button from './Button';
import DatePickerField from './DatePickerField';

interface FormValues {
  date: Date;
}

export default function SetMaxBookingDateForm({
  maxDate,
}: {
  maxDate: MaxDate;
}) {
  const { data, error, mutate, isLoading } = useMaxBookingDate(maxDate);

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaSetMaxBookingDate),
    defaultValues: {
      date: data?.date || new Date(),
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const watchDate = watch('date');

  const onSubmitHandler = async (formValues: FormValues) => {
    try {
      const updatedData = { _id: data?._id || '', ...formValues };

      await mutate(updatedData);
      toast.success('Max booking date was successfully updated!', {
        duration: 3000,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    }
  };

  if (error) {
    return (
      <p className="text-error">
        Failed to load max booking date. Please try again later.
      </p>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex py-2.5 px-4 md:py-4 md:px-8 justify-between gap-2.5 lg:gap-5 flex-wrap flex-col md:flex-row"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <AdminTitle title="Maximum Booking Date" />
        <div className="flex gap-0 lg:gap-10 lg:items-start  flex-col lg:flex-row">
          <DatePickerField<FormValues>
            name="date"
            control={control}
            error={errors.date?.message}
            bday={false}
            minDate={new Date()}
            admin={true}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              isProcessing={isLoading}
              disabled={
                Object.keys(errors).length !== 0 ||
                isLoading ||
                watchDate === data?.date
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
