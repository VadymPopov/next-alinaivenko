'use client';

import AdminTitle from '@/components/admin/AdminTitle';
import Button from '@/components/ui/Button';
import DatePickerField from '@/components/ui/DatePickerField';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/Select';
import useBlockedSlots from '@/hooks/useBlockedSlots';
import useSlots from '@/hooks/useSlots';
import { validationSchemaBlockSlot } from '@/schemas';
import { durationOptions, slotsOptions } from '@/utils/helpers';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';

interface FormValues {
  date: Date;
  slot: string;
  duration: string;
  reason?: string;
}

export default function BlockSlotForm() {
  const { isValidating, error, addBlockedSlot } = useBlockedSlots();

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
      const { date, duration, reason } = formValues;
      const newBlockedSlot = {
        ...formValues,
        duration: Number(duration),
        date: format(date, 'yyyy-MM-dd'),
        reason: reason || '',
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
            options={durationOptions(18)}
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
              isProcessing={isValidating}
              disabled={!!Object.keys(errors).length || isValidating}
            >
              {isValidating ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>
        {error && <p className="text-error font-medium">{error.message}</p>}
      </form>
    </FormProvider>
  );
}
