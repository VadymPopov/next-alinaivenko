'use client';

import Button from '@/components/ui/Button';
import FieldSet from '@/components/ui/FieldSet';
import InputField from '@/components/ui/InputField';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';
import { validationSchemaWaiverStepFive } from '@/schemas';
import { StepFiveFormValues } from '@/types';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

export default function StepFive({ nextStep }: { nextStep: () => void }) {
  const { updateFormData, formData } = useWaiverFormContext();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaWaiverStepFive),
    defaultValues: {
      refund: formData.refund || false,
      permanentChange: formData.permanentChange || false,
      media: formData.media || false,
      age: formData.age || false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (formValues: StepFiveFormValues) => {
    updateFormData(formValues);
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="No Refunds:">
          <InputField
            name="refund"
            label="I acknowledge
                and accept the Tattoo Artist's NO REFUND policy for tattoos. I
                understand that the tattoo deposit is non-refundable and that I
                must provide at least 1 week's notice to reschedule or change my
                appointment. Failure to do so will require the purchase of a new
                deposit."
            type="checkbox"
            error={errors.refund?.message || ''}
          />
        </FieldSet>

        <FieldSet title="Acknowledgement of Permanent Change:">
          <InputField
            name="permanentChange"
            label="I understand that a tattoo is a permanent change to my
                appearance, and there are no guarantees for future changes or
                removal. Modifying or removing a tattoo can be expensive,
                potentially disfiguring, and may not fully restore my skin to
                its original appearance."
            type="checkbox"
            error={errors.permanentChange?.message || ''}
          />
        </FieldSet>

        <FieldSet title="Media Consent:">
          <InputField
            name="media"
            label="I acknowledge
                that the Tattoo Artist retains full rights to utilize any
                photographs or videos of my tattoo, and I willingly grant
                consent for such visual media to be captured during and after my
                tattoo procedure."
            type="checkbox"
            error={errors.media?.message || ''}
          />
        </FieldSet>

        <FieldSet title="Age and Identification:">
          <InputField
            name="age"
            label="I confirm that I am
                either at least 18 years old or have a legal guardian present.
                In both cases, all parties involved will provide
                government-issued photo identification as required."
            type="checkbox"
            error={errors.age?.message || ''}
          />
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
