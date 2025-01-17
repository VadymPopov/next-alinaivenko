'use client';

import Button from '@/components/ui/Button';
import DatePickerField from '@/components/ui/DatePickerField';
import FieldSet from '@/components/ui/FieldSet';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/Select';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';
import { validationSchemaWaiverStepTwo } from '@/schemas';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

export interface StepTwoData {
  service: string;
  bodyPart: string;
  design: string;
  appointmentDate: string;
}

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

  const onSubmitHandler = (formValues: StepTwoData) => {
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
          <DatePickerField<StepTwoData>
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
