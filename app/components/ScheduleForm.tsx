'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { useAppContext } from '../context/useGlobalState';
import { validationSchemaSchedule } from '../schemas';
import { findNextAvailableDate } from '../utils/findNextAvailableDate';
import { pickDuration } from '../utils/helpers';
import Button from './Button';
import CalendarPicker from './CalendarPicker';
import FieldSet from './FieldSet';
import SlotsPicker from './SlotsPicker';

export interface IFormValues {
  date: Date;
  slot: string;
}

export default function ScheduleForm() {
  const router = useRouter();
  const { service, appointmentInfo, setAppointmentInfo } = useAppContext();

  useEffect(() => {
    if (!appointmentInfo) {
      router.replace('/booking');
    }
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaSchedule),
    defaultValues: {
      date: findNextAvailableDate(),
      slot: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = methods;

  const selectedDate = watch('date');
  const duration = pickDuration(service);

  const onSubmitHandler = async (formData: IFormValues) => {
    const info = {
      ...appointmentInfo,
      date: format(formData.date, 'MM.dd.yyyy'),
      slot: formData.slot,
      duration,
    };

    router.push('/booking/payment');

    setAppointmentInfo(info);
  };

  // useEffect(() => {
  //   (async () => {
  //     const slots = await getAvailableSlots(
  //       format(selectedDate, 'MM.dd.yyyy'),
  //       duration
  //     );
  //     setSlots(slots);
  //   })();
  // }, [duration, selectedDate]);

  const slots = [
    '11:00am',
    '12:00pm',
    '1:00pm',
    '2:00pm',
    '3:00pm',
    '4:00pm',
    '5:00pm',
    '6:00pm',
    '7:00pm',
    '8:00pm',
  ];

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
            />
            <div>
              <p>{selectedDate && format(selectedDate, 'MMMM dd, yyyy')}</p>
              <SlotsPicker
                name="slot"
                control={control}
                error={errors.slot?.message}
                slots={slots}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={Object.keys(errors).length !== 0}>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
