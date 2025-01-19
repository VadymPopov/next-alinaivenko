'use client';

import {
  Button,
  DatePickerField,
  FieldSet,
  InputField,
  SelectField,
} from '@/components/ui';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';
import { validationSchemaWaiverStepTwo } from '@/schemas';
import { StepTwoFormValues } from '@/types';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

export default function StepTwo({ nextStep }: { nextStep: () => void }) {
  const { updateFormData, formData } = useWaiverFormContext();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaWaiverStepTwo),
    defaultValues: {
      service: formData.service || 'Tattoo',
      bodyPart: formData.bodyPart || '',
      design: formData.design || '',
      appointmentDate: formData.appointmentDate || new Date().toDateString(),
    },
  });

  const {
    handleSubmit,
    setFocus,
    control,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (formValues: StepTwoFormValues) => {
    updateFormData(formValues);
    nextStep();
  };

  useEffect(() => {
    setFocus('service');
  }, [setFocus]);

  const selectOptions = [
    { value: 'Tattoo', label: 'Tattoo' },
    { value: 'Permanent Makeup', label: 'Permanent Makeup' },
  ];

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Description of Activity:">
          <SelectField
            name="service"
            control={control}
            label="What service are you receiving?"
            options={selectOptions}
            error={errors.service?.message || ''}
          />
          <InputField
            name="bodyPart"
            label="The tattoo will be placed on the following body part:"
            type="text"
            placeholder="Enter Tattoo placement"
            title="Enter tattoo placement"
            error={errors.bodyPart?.message || ''}
          />
          <InputField
            name="design"
            type="text"
            placeholder="Enter Tattoo design"
            title="Email Tattoo design"
            label="The design is described as follows (including style, theme, elements, or specific instructions):"
            error={errors.design?.message || ''}
          />
          <DatePickerField<StepTwoFormValues>
            name="appointmentDate"
            control={control}
            label="Appointment Date"
            error={errors.appointmentDate?.message}
            bday={false}
            minDate={new Date()}
          />
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
