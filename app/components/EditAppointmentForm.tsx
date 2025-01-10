'use client';

import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { serviceOptions } from '../constants/constants';
import useAppointments from '../hooks/useAppointments';
import useSlots from '../hooks/useSlots';
import { validationSchemaEditAppointment } from '../schemas';
import {
  calculateTotals,
  durationOptions,
  getParsedDate,
  slotsOptions,
} from '../utils/helpers';
import { calculateStripeFee } from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
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
  service: 'Small Tattoo' | 'Large Tattoo' | 'Touch-up' | 'Permanent Makeup';
  slot: string;
  duration: string;
  depositAmount?: number;
  depositTax?: number;
  depositFee?: number;
  depositTotal?: number;
  paymentAmount?: number;
  paymentTax?: number;
  paymentTotal?: number;
  paymentFee?: number;
  tip?: number;
}

export default function EditAppointmentForm({
  appointment,
}: {
  appointment: IAppointment;
}) {
  const router = useRouter();
  const {
    name,
    email,
    date,
    service,
    duration,
    slot,
    deposit,
    payment,
    _id,
    paymentIntentId,
  } = appointment || {};

  const methods = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(validationSchemaEditAppointment),
    defaultValues: {
      name,
      email,
      date: date ? getParsedDate(date) : new Date(),
      service,
      duration: String(duration),
      slot,
      depositAmount: deposit?.amount,
      depositTax: deposit?.tax,
      depositFee: deposit?.fee,
      depositTotal: deposit?.total,
      paymentAmount: payment?.total,
      paymentTax: payment?.tax,
      paymentFee: payment?.fee,
      paymentTotal: payment?.total,
      tip: payment?.tip,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const selectedDate = watch('date');
  const selectedDuration = watch('duration');
  const paymentAmount = watch('paymentAmount');
  const paymentFee = watch('paymentFee');
  const tip = watch('tip');

  const totals = useMemo(
    () => calculateTotals(paymentAmount, paymentFee, tip),
    [paymentAmount, paymentFee, tip],
  );

  useEffect(() => {
    setValue('paymentFee', calculateStripeFee(paymentAmount || 0));
    setValue('paymentTax', totals.tax);
    setValue('paymentTotal', totals.total);
  }, [totals, setValue, paymentAmount]);

  const { slots } = useSlots({
    date: format(selectedDate, 'yyyy-MM-dd'),
    duration: Number(selectedDuration),
    isEditing: true,
    id: appointment._id,
  });

  const memoizedSlots = useMemo(() => slotsOptions(slots), [slots]);

  const { isValidating, updateAppointment } = useAppointments();

  const onSubmitHandler = async (formValues: FormValues) => {
    try {
      await updateAppointment({
        _id,
        ...formValues,
        paymentIntentId,
        date: format(formValues.date, 'yyyy-MM-dd'),
      });
      toast.success('An appointment was successfully updated!', {
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
            error={errors.name?.message}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Enter Email"
            title="Email must contain an “@” symbol before the domain"
            label="Email"
            error={errors.email?.message}
          />
          <InputField
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            label="Phone number"
            optional={true}
            error={errors.phone?.message}
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
            error={errors.service?.message}
          />
          <SelectField
            name="duration"
            control={control}
            label="Duration"
            options={durationOptions(18)}
            error={errors.duration?.message}
          />
          <SelectField
            name="slot"
            control={control}
            label="Slot"
            options={memoizedSlots}
            error={errors.slot?.message}
          />
        </FieldSet>

        <FieldSet title="Deposit:">
          <InputField
            name="depositAmount"
            placeholder="Enter deposit amount"
            label="Amount"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
          <InputField
            name="depositTax"
            placeholder="Enter deposit tax"
            label="Tax"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
          <InputField
            name="depositFee"
            placeholder="Enter deposit fee"
            label="Fee"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
          <InputField
            name="depositTotal"
            placeholder="Enter total deposit amount"
            label="Total"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
        </FieldSet>

        <FieldSet title="Payment:">
          <InputField
            name="paymentAmount"
            placeholder="Enter payment amount"
            label="Amount"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
          <InputField
            name="paymentTax"
            placeholder="Enter payment tax"
            label="Tax"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
          <InputField
            name="paymentFee"
            placeholder="Enter payment fee"
            label="Fee"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
          <InputField
            name="tip"
            placeholder="Enter tip"
            label="Tip"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
          <InputField
            name="paymentTotal"
            placeholder="Enter total payment amount"
            label="Total"
            type="number"
            min={0}
            step="any"
            defaultValue={0}
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
            {isValidating ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
