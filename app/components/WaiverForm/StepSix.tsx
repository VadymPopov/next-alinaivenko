'use client';

import { useWaiverFormContext } from '@/app/context/WaiverFormContext';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchemaWaiverStepSix } from '../../schemas';
import Button from '../Button';
import FieldSet from '../FieldSet';
import InputField from '../InputField';

export interface StepSixData {
  drugs?: boolean;
  disease?: boolean;
  medication?: boolean;
  skin?: boolean;
  recipientOrgan?: boolean;
  pregnancy?: boolean;
}

export default function StepSix({ nextStep }: { nextStep: () => void }) {
  const { updateFormData, formData } = useWaiverFormContext();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaWaiverStepSix),
    defaultValues: {
      drugs: formData.drugs || false,
      disease: formData.disease || false,
      medication: formData.medication || false,
      skin: formData.skin || false,
      recipientOrgan: formData.recipientOrgan || false,
      pregnancy: formData.pregnancy || false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (formValues: StepSixData) => {
    updateFormData(formValues);
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Drugs/Alcohol and Medical Conditions:">
          <InputField
            name="drugs"
            label="I confirm that
                I am not under the influence of alcohol or drugs and I willingly
                choose to be tattooed by the Tattoo Artist without any duress or
                coercion."
            type="checkbox"
            error={errors.drugs?.message || ''}
          />
          <InputField
            name="disease"
            label="I confirm
                that I do not have diabetes, epilepsy, hemophilia, or any heart
                condition(s) that could potentially hinder the tattooing
                procedure or present additional risks."
            type="checkbox"
            error={errors.disease?.message || ''}
          />
          <InputField
            name="medication"
            label="I
                confirm that I am not currently taking any blood thinning
                medication that may increase the risk of excessive bleeding
                during the tattooing process."
            type="checkbox"
            error={errors.medication?.message || ''}
          />
          <InputField
            name="skin"
            label="I confirm that I
                do not have any other medical or skin conditions that could
                potentially interfere with the procedure, application, or
                healing of the tattoo, including active infections, open wounds,
                skin disorders, or a compromised immune system."
            type="checkbox"
            error={errors.skin?.message || ''}
          />
          <InputField
            name="recipientOrgan"
            label="I confirm that I am not a recipient of an organ or bone marrow
                transplant. If I am, I have diligently followed my doctor's
                prescribed preventative regimen of antibiotics in preparation
                for any invasive procedure, such as tattooing."
            type="checkbox"
            error={errors.recipientOrgan?.message || ''}
          />
          <InputField
            name="pregnancy"
            label="If applicable, I confirm that I am not currently pregnant or
                nursing at the time of receiving the tattoo."
            type="checkbox"
            error={errors.pregnancy?.message || ''}
          />
        </FieldSet>

        <div className="flex justify-center items-center">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
