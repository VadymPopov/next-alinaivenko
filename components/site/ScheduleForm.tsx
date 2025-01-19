'use client';

import CalendarPicker from '@/components/site/CalendarPicker';
import SlotsPicker from '@/components/site/SlotsPicker';
import Button from '@/components/ui/Button';
import FieldSet from '@/components/ui/FieldSet';
import SkeletonGrid from '@/components/ui/SkeletonGrid';
import useSlots from '@/hooks/useSlots';
import { useAppContext } from '@/providers/AppContext';
import { validationSchemaSchedule } from '@/schemas';
import { MaxDate, ScheduleFormValues } from '@/types';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { format, parse, startOfDay } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function ScheduleForm({
  availableDate,
  initialSlots,
  maxDate,
  blockedDates,
  duration,
}: {
  availableDate: string;
  initialSlots: string[];
  maxDate: MaxDate;
  blockedDates: string[];
  duration: number;
}) {
  const router = useRouter();
  const { appointmentInfo, setAppointmentInfo } = useAppContext();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaSchedule),
    defaultValues: {
      date: availableDate
        ? parse(availableDate, 'yyyy-MM-dd', new Date())
        : new Date(),
      slot: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
  } = methods;

  const selectedDate = watch('date');
  const date = format(startOfDay(selectedDate as Date), 'yyyy-MM-dd');

  const { slots, isLoading, isError } = useSlots({
    date,
    fallbackData: initialSlots,
    duration,
  });

  if (isError) {
    toast.error('Error fetching slots');
    return (
      <div>
        <p>{selectedDate && format(selectedDate, 'MMMM dd, yyyy')}</p>
        <div className="text-error text-center">
          <p>Error fetching slots. Please try again later.</p>
        </div>
      </div>
    );
  }

  const onSubmitHandler = async (formData: ScheduleFormValues) => {
    const info = {
      ...appointmentInfo,
      date: formData.date,
      slot: formData.slot,
      duration,
    };

    router.push('/booking/payment');
    setAppointmentInfo(info);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="schedule text-center"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FieldSet title="Choose a time:">
          <div className="lg:grid grid-cols-2 items-center">
            <CalendarPicker
              name="date"
              control={control}
              error={errors.date?.message}
              maxDate={maxDate}
              blockedDates={blockedDates}
            />
            <div>
              <p>{selectedDate && format(selectedDate, 'MMMM dd, yyyy')}</p>
              {isLoading ? (
                <div
                  className={clsx(
                    'flex items-center justify-center',
                    'transition-opacity duration-500',
                    isLoading ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <SkeletonGrid
                    rows={3}
                    columns={6}
                    borderRadius={16}
                    buttonWidth={90}
                    buttonHeight={38}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 sm:w-auto sm:grid-cols-3"
                  />
                </div>
              ) : (
                <div
                  className={clsx(
                    'transition-opacity duration-500',
                    isLoading ? 'opacity-0' : 'opacity-100',
                  )}
                >
                  <SlotsPicker
                    name="slot"
                    control={control}
                    error={errors.slot?.message}
                    slots={slots}
                    selectedDate={selectedDate}
                  />
                </div>
              )}
            </div>
          </div>
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={!isValid || isLoading}>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
