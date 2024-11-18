'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { validationSchemaAddAppointment } from '../schemas';
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

const serviceOptions = [
  { value: 'Small Tattoo', label: 'Small Tattoo' },
  { value: 'Large Tattoo', label: 'Large Tattoo' },
  { value: 'Touch-up', label: 'Touch-up' },
  { value: 'Permanent Makeup', label: 'Permanent Makeup' },
];

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

export default function AddAppointmentForm() {
  const [isProcessing, setIsProcessing] = useState(false);

  const [slotsOptions, setSlotsOptions] = useState([]);
  const router = useRouter();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaAddAppointment),
    defaultValues: {
      date: new Date(),
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

  useEffect(() => {
    (async () => {
      if (!selectedDuration) return;
      const response = await fetch(
        `/api/slots?date=${format(selectedDate, 'MMMM dd, yyyy')}&duration=${selectedDuration}`,
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
      const res = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formValues,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('An appointment was successfully added!', {
        duration: 3000,
      });
      router.replace('/admin/appointments');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    } finally {
      setIsProcessing(false);
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
            isProcessing={isProcessing}
            disabled={Object.keys(errors).length !== 0 || isProcessing}
          >
            {isProcessing ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
