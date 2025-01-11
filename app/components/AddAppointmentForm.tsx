'use client';

import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { serviceOptions } from '../constants/constants';
import useAppointments from '../hooks/useAppointments';
import useSlots from '../hooks/useSlots';
import { serviceType } from '../providers/BookingFormContext';
import { validationSchemaAddAppointment } from '../schemas';
import { durationOptions, slotsOptions } from '../utils/helpers';
import Button from './Button';
import DatePickerField from './DatePickerField';
import FieldSet from './FieldSet';
import InputField from './InputField';
import SelectField from './Select';

interface FormValues {
  phone?: string | null;
  instagram?: string;
  description?: string;
  name: string;
  email: string;
  date: Date;
  service: string;
  slot: string;
  duration: string;
}

export default function AddAppointmentForm() {
  const searchParams = useSearchParams();
  const slot = searchParams.get('slot');
  const date = searchParams.get('date');

  const router = useRouter();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaAddAppointment),
    defaultValues: {
      date: date ? new Date(date) : new Date(),
      slot: slot ? slot : undefined,
    },
  });

  const {
    handleSubmit,
    setFocus,
    control,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const selectedDate = watch('date');
  const selectedDuration = watch('duration');

  const { slots } = useSlots({
    date: format(selectedDate || date, 'yyyy-MM-dd'),
    duration: Number(selectedDuration) || 30,
  });

  const memoizedSlots = useMemo(() => slotsOptions(slots), [slots]);
  const { isValidating, addAppointment } = useAppointments();

  const onSubmitHandler = async (formValues: FormValues) => {
    const { phone, date, duration, instagram, description, service } =
      formValues;
    try {
      await addAppointment({
        url: '/api/admin/appointments',
        newAppt: {
          ...formValues,
          phone: phone || '',
          service: service as serviceType,
          instagram: instagram || '',
          description: description || '',
          date: format(date, 'yyyy-MM-dd'),
          duration: Number(duration),
          deposit: {
            amount: 0,
            tax: 0,
            fee: 0,
            total: 0,
          },
        },
      });
      toast.success('An appointment was successfully added!', {
        duration: 3000,
      });
      router.replace('/admin/appointments');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Client information:">
          <InputField
            name="name"
            label="Full Name"
            type="text"
            placeholder="Enter First and Last Name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            error={errors.name?.message || ''}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Enter Email"
            title="Email must contain an “@” symbol before the domain"
            label="Email"
            error={errors.email?.message || ''}
          />
          <InputField
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            label="Phone number"
            optional={true}
            error={errors.phone?.message || ''}
          />
          <InputField
            name="instagram"
            type="text"
            placeholder="Enter instagram @username"
            label="Instagram"
            title="Instagram username"
            optional={true}
          />
        </FieldSet>
        <FieldSet title="Appointment information:">
          <DatePickerField<FormValues>
            name="date"
            control={control}
            label="Appointment Date"
            error={errors.date?.message}
            bday={false}
            minDate={new Date()}
          />
          <SelectField
            name="service"
            control={control}
            label="Service"
            options={serviceOptions}
            error={errors.service?.message || ''}
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
            options={memoizedSlots}
            error={errors.slot?.message || ''}
          />
        </FieldSet>
        <InputField
          name="description"
          placeholder="Enter a brief description of your idea or any additional details here..."
          label="Brief Description"
          type="text"
          optional={true}
          textarea={true}
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
      </form>
    </FormProvider>
  );
}
