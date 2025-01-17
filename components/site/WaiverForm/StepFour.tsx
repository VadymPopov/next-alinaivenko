'use client';

import Button from '@/components/ui/Button';
import FieldSet from '@/components/ui/FieldSet';
import InputField from '@/components/ui/InputField';
import Text from '@/components/ui/Text';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';
import { validationSchemaWaiverStepFour } from '@/schemas';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

export interface StepFourData {
  pain?: boolean;
  infection?: boolean;
  healing?: boolean;
  outcome?: boolean;
}

export default function StepFour({ nextStep }: { nextStep: () => void }) {
  const { updateFormData, formData } = useWaiverFormContext();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaWaiverStepFour),
    defaultValues: {
      pain: formData.pain || false,
      infection: formData.infection || false,
      healing: formData.healing || false,
      outcome: formData.outcome || false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (formValues: StepFourData) => {
    updateFormData(formValues);
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Assumption of Risk:">
          <div className="max-w-2xl m-auto">
            <Text>
              I have been fully informed of the inherent risks associated with
              getting a tattoo. Therefore, I fully understand and accept the
              potential risks, both known and unknown, involved in the tattooing
              process, including but are not limited to:
            </Text>
          </div>

          <h3 className="font-bold text-lg tracking-wider text-mainDarkColor text-start my-2.5 mx-0 md:my-5">
            Pain and Discomfort:
          </h3>
          <InputField
            name="pain"
            label="I understand that
                the tattooing process may involve pain, discomfort, and
                potential physical reactions. I am voluntarily choosing to
                undergo this procedure despite these potential sensations."
            type="checkbox"
            error={errors.pain?.message || ''}
          />

          <h3 className="font-bold text-lg tracking-wider text-mainDarkColor text-start my-2.5 mx-0 md:my-5">
            Infection and Allergic Reactions:
          </h3>
          <InputField
            name="infection"
            label="I am
                aware that there is a risk of infection, allergic reactions, or
                other adverse skin reactions as a result of the tattooing
                process. I understand that the Tattoo Artist will follow
                appropriate hygiene and safety measures, but I acknowledge that
                these risks still exist."
            type="checkbox"
            error={errors.infection?.message || ''}
          />

          <h3 className="font-bold text-lg tracking-wider text-mainDarkColor text-start my-2.5 mx-0 md:my-5">
            Healing Process:
          </h3>
          <InputField
            name="healing"
            label="I
                understand that the healing process varies among individuals,
                and I am responsible for proper aftercare. I acknowledge that
                proper aftercare, as instructed by the Tattoo Artist, is
                essential for optimal healing. Any complications or
                unsatisfactory healing that may occur are my responsibility. Any
                touch-up work needed due to my negligence will be at my own
                expense."
            type="checkbox"
            error={errors.healing?.message || ''}
          />

          <h3 className="font-bold text-lg tracking-wider text-mainDarkColor text-start my-2.5 mx-0 md:my-5">
            Tattoo Outcome:
          </h3>
          <InputField
            name="outcome"
            label="I
                acknowledge that the final appearance of the tattoo, including
                color, placement, size, and design, may vary due to individual
                skin characteristics, healing process, and artistic
                interpretation. I understand that the Tattoo Artist will
                exercise their professional judgment in delivering the best
                possible outcome, but I accept that there may be variations. I
                acknowledge that the Tattoo Artist is not accountable for the
                accuracy, meaning, or spelling of the symbols, text, or dates
                that I have provided or selected from the flash (design) sheets.
                I am fully responsible for verifying these details prior to
                getting the tattoo."
            type="checkbox"
            error={errors.outcome?.message || ''}
          />
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
