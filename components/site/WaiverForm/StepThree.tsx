'use client';

import Button from '@/components/ui/Button';
import FieldSet from '@/components/ui/FieldSet';
import InputField from '@/components/ui/InputField';
import Text from '@/components/ui/Text';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';
import { validationSchemaWaiverStepThree } from '@/schemas';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

export interface StepThreeData {
  waveRelease?: boolean;
}

export default function StepThree({ nextStep }: { nextStep: () => void }) {
  const { updateFormData, formData } = useWaiverFormContext();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaWaiverStepThree),
    defaultValues: {
      waveRelease: formData.waveRelease || false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (formValues: StepThreeData) => {
    updateFormData(formValues);
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl m-auto">
        <Text>
          In consideration of receiving a tattoo/permanent makeup (hereinafter
          referred to as the &quot;tattoo&quot;) from ALINA IVENKO (hereinafter
          referred to as the &quot;Tattoo Artist&quot;), I voluntarily agree to
          the following terms and conditions. I acknowledge that the tattooing
          process involves inherent risks, uncertainties, and potential
          discomfort.
        </Text>
      </div>

      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Waiver and Release:">
          <InputField
            name="waveRelease"
            label="I WAIVE AND RELEASE to the fullest extent permitted by law the Tattoo Artist from all claims, demands, or liabilities arising from the tattooing process, including personal injury or any direct and/or consequential damages resulting from the application of my tattoo. This waiver includes any negligence or fault on the part of the Tattoo Artist."
            type="checkbox"
            error={errors.waveRelease?.message || ''}
          />
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
