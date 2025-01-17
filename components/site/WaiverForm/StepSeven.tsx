'use client';

import Button from '@/components/ui/Button';
import FieldSet from '@/components/ui/FieldSet';
import InputField from '@/components/ui/InputField';
import SignatureField from '@/components/ui/SignatureField';
import Text from '@/components/ui/Text';
import { useWaiverSubmission } from '@/hooks/useWaiverFormSubmission';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';
import { validationSchemaWaiverStepSeven } from '@/schemas';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

export interface StepSevenData {
  lot: string;
  agreement?: boolean;
  clientSignature?: string;
  parentalConsent?: boolean;
  parentalName?: string;
  parentGovernmentId?: string;
  parentalSignature?: string;
}
//   name: values.name,
//   email: values.email,
//   phone: values.phone,
//   governmentId: values.governmentId,
//   dob: values.dob,
//   address: values.address,
//   bodyPart: values.bodyPart,
//   design: values.design,
//   service: values.service,
//   lot: values.lot,
//   appointmentDate: format(values.appointmentDate as string, 'yyyy-MM-dd'),
//   isClientUnder18: values.isClientUnder18,
//   ...(values.isClientUnder18
//     ? {
//         parentalSignature: values.parentalSignature,
//         parentalName: values.parentalName,
//         parentGovernmentId: values.parentGovernmentId,
//       }
//     : { clientSignature: values.clientSignature }),
// });

export default function StepSeven() {
  const { updateFormData, isClientUnder18, formData } = useWaiverFormContext();
  const router = useRouter();

  const { isProcessing, submitForm } = useWaiverSubmission();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaWaiverStepSeven(isClientUnder18)),
    defaultValues: formData,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (formValues: StepSevenData) => {
    updateFormData(formValues);

    const result = await submitForm({
      ...formValues,
      ...formData,
      isClientUnder18,
    });

    if (result.success) {
      toast.success('The form was successfully submitted!', {
        duration: 3000,
      });
      router.replace('/faq');
    } else {
      toast.error(
        result.error instanceof Error
          ? result.error.message
          : 'Form submission failed.',
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <Text>
          If single-use presterilized equipment is used please provide Lot/ID
          number
        </Text>

        <InputField
          name="lot"
          label="Lot/ID number"
          type="text"
          placeholder="Enter Lot/ID number"
          title="Ask your tattoo artist about this number"
          error={errors.lot?.message || ''}
        />

        <FieldSet title="Acknowledgement of Agreement:">
          <InputField
            name="agreement"
            label="By signing below, I confirm that I have read and understood the
                entire content of this form, including the terms and provisions
                stated. I am fully aware that this agreement contains a waiver
                of rights, and I acknowledge that it is a unilateral agreement
                with significant obligations. If any part of this release is
                found to be unenforceable or invalid, that specific portion will
                be removed, while the rest of the contract remains valid and
                enforceable. I understand that by signing this form, I am
                acknowledging that I have had the opportunity to seek
                clarification and have any questions answered regarding its
                contents. I willingly and voluntarily agree to be bound by the
                terms of this agreement without any objections or reservations."
            type="checkbox"
            error={errors.agreement?.message || ''}
          />
        </FieldSet>

        {!isClientUnder18 ? (
          <FieldSet title="Client Signature:">
            <SignatureField
              name="clientSignature"
              error={errors.clientSignature?.message || ''}
              control={control}
            />
          </FieldSet>
        ) : (
          <FieldSet title="FOR CLIENTS UNDER 18">
            <h3 className="font-bold text-lg tracking-wider text-mainDarkColor text-start my-2.5 mx-0 md:my-5">
              Parental/Guardian Consent:
            </h3>
            <InputField
              name="parentalConsent"
              label="As the parent or legal guardian, I hereby provide my consent
                  for my child to receive tattooing services. I confirm that I
                  have read and understood the contents of this form, and I
                  agree to be bound by its terms and conditions. Additionally, I
                  acknowledge that I will provide both my government-issued
                  photo identification and my child's government-issued photo
                  identification as required."
              type="checkbox"
              error={errors.parentalConsent?.message || ''}
            />
            <h3 className="font-bold text-lg tracking-wider text-mainDarkColor text-start my-2.5 mx-0 md:my-5">
              Parental/Guardian Information:
            </h3>
            <InputField
              name="parentalName"
              label="Full Name"
              type="text"
              placeholder="Enter First and Last Name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              error={errors.parentalName?.message || ''}
            />
            <InputField
              name="parentGovernmentId"
              type="text"
              placeholder="Enter Government-Issued ID number"
              title="Enter your Social Insurance Number (SIN) without spaces or dashes"
              label="Enter Government-Issued ID number"
              error={errors.parentGovernmentId?.message || ''}
            />
            <h3 className="font-bold text-lg tracking-wider text-mainDarkColor text-start my-2.5 mx-0 md:my-5">
              Parental/Guardian Signature:
            </h3>
            <SignatureField<StepSevenData>
              name="parentalSignature"
              error={errors.parentalSignature?.message || ''}
              control={control}
            />
          </FieldSet>
        )}

        <div className="flex justify-center items-center">
          <Button
            type="submit"
            isProcessing={isProcessing}
            disabled={!!Object.keys(errors).length || isProcessing}
          >
            {isProcessing ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
