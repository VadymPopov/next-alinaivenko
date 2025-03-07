'use client';

import { Button, DatePickerField, FieldSet, InputField } from '@/components/ui';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';
import { validationSchemaWaiverStepOne } from '@/schemas';
import { StepOneFormValues, WaiverFormData } from '@/types';
import { isClientUnderage } from '@/utils';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

export default function StepOne({ nextStep }: { nextStep: () => void }) {
  const { updateFormData, setIsClientUnder18, formData } =
    useWaiverFormContext();

  const methods = useForm<StepOneFormValues>({
    mode: 'all',
    resolver: yupResolver(validationSchemaWaiverStepOne),
    defaultValues: {
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || null,
      governmentId: formData.governmentId || '',
      dob: formData.dob || '',
      address: formData.address || '',
    },
  });

  const {
    handleSubmit,
    setFocus,
    control,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (formValues: Partial<WaiverFormData>) => {
    updateFormData(formValues);
    setIsClientUnder18(isClientUnderage(new Date(formValues?.dob as string)));
    nextStep();
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Client Information:">
          <InputField
            name="name"
            label="Full Name"
            type="text"
            placeholder="Enter First and Last Name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            error={errors.name?.message || ''}
          />
          <DatePickerField<StepOneFormValues>
            name="dob"
            control={control}
            label="Birthday Date"
            bday={true}
            error={errors.dob?.message}
            maxDate={new Date()}
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
            name="address"
            type="text"
            placeholder="Enter street, city, province, postal code"
            title="Enter your full address including street, city, province, and postal code"
            label="Address (street, city, province, postal code)"
            error={errors.address?.message || ''}
          />
          <InputField
            name="governmentId"
            type="text"
            placeholder="Enter Government-Issued ID number"
            title="Enter your Social Insurance Number (SIN) without spaces or dashes"
            label="Enter Government-Issued ID number"
            error={errors.governmentId?.message || ''}
          />
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={!!Object.keys(errors).length}>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
