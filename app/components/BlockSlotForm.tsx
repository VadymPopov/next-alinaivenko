'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';

import useBlockedSlots from '../hooks/useBlockedSlots';
import useSlots from '../hooks/useSlots';
import { validationSchemaBlockSlot } from '../schemas';
import { durationOptions, slotsOptions } from '../utils/helpers';
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

export default function BlockSlotForm() {
  const { isLoading, error, addBlockedSlot } = useBlockedSlots();

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

  const { slots } = useSlots({
    date: format(selectedDate, 'yyyy-MM-dd'),
    duration: Number(selectedDuration),
  });

  const onSubmitHandler = async (formValues: FormValues) => {
    try {
      const newBlockedSlot = {
        ...formValues,
        date: format(formValues.date, 'yyyy-MM-dd'),
        reason: formValues.reason || '',
      };

      await addBlockedSlot(newBlockedSlot);
      toast.success('Selected slot was successfully blocked!', {
        duration: 3000,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
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
            options={durationOptions(540 / 30)}
            error={errors.duration?.message || ''}
          />
          <SelectField
            name="slot"
            control={control}
            label="Slot"
            options={slotsOptions(slots)}
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
        {error && <p className="text-error font-medium">{error.message}</p>}
      </form>
    </FormProvider>
  );
}
