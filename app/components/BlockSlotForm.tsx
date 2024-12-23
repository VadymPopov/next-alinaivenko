'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';

import { validationSchemaBlockSlot } from '../schemas';
import AdminTitle from './AdminTitle';
import Button from './Button';
import DatePickerField from './DatePickerField';
import InputField from './InputField';
import SelectField from './Select';

interface FormValues {
  date: Date;
  slot: string;
  duration: string;
  reason?: string;
}

const durationOptions = Array.from({ length: 540 / 30 }, (_, i) => {
  const value = (i + 1) * 30;
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  const label =
    hours > 0
      ? `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`
      : `${minutes}min`;

  return {
    value: value.toString(),
    label,
  };
});

export default function BlockSlotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [slotsOptions, setSlotsOptions] = useState([]);

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaBlockSlot),
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

  const selectedDate = watch('date');
  const selectedDuration = watch('duration');

  useEffect(() => {
    (async () => {
      if (!selectedDuration) return;
      const response = await fetch(
        `/api/slots?date=${format(selectedDate, 'yyyy-MM-dd')}&duration=${selectedDuration}`,
      );
      const slots = await response.json();
      const slotsOptions = slots.map((slot: string) => ({
        value: slot,
        label: slot,
      }));
      setSlotsOptions(slotsOptions);
    })();
  }, [selectedDuration, selectedDate]);

  const onSubmitHandler = async (formValues: FormValues) => {
    try {
      setIsLoading(true);

      const res = await fetch('/api/admin/calendar/blocked-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formValues,
          date: format(formValues.date, 'yyyy-MM-dd'),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Selected slot was successfully blocked!', {
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
        className="py-2.5 px-4 md:py-4 md:px-8"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <AdminTitle title="Block slot" />
        <div className="text-center">
          <DatePickerField<FormValues>
            name="date"
            label="Date"
            control={control}
            error={errors.date?.message}
            bday={false}
            minDate={new Date()}
          />
          <SelectField
            name="duration"
            control={control}
            label="Duration"
            options={durationOptions}
            error={errors.duration?.message || ''}
          />
          <SelectField
            name="slot"
            control={control}
            label="Slot"
            options={slotsOptions}
            error={errors.slot?.message || ''}
          />
          <InputField
            name="reason"
            type="text"
            placeholder="Enter reason"
            label="Reason"
            title="Reason for block"
            optional={true}
          />
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              isProcessing={isLoading}
              disabled={Object.keys(errors).length !== 0 || isLoading}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
