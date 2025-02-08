'use client';

import { Button, InputField } from '@/components/ui';
import { validationSchemaCustomTip } from '@/schemas';
import { CustomTipFormValues } from '@/types';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdDone } from 'react-icons/md';

import { yupResolver } from '@hookform/resolvers/yup';

interface CustomTipFormProps {
  setTip: React.Dispatch<React.SetStateAction<number>>;
  showCustomTipForm: boolean;
  setShowCustomTipForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CustomTipForm({
  setTip,
  showCustomTipForm,
  setShowCustomTipForm,
}: CustomTipFormProps) {
  const onSubmitHandler = (values: CustomTipFormValues) => {
    const { amount } = values;
    setTip(amount);
    setShowCustomTipForm(false);
  };

  const methods = useForm<CustomTipFormValues>({
    mode: 'all',
    resolver: yupResolver(validationSchemaCustomTip),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const amount = watch('amount');

  return (
    <>
      {showCustomTipForm && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex justify-center items-center flex-row mb-5 gap-5"
          >
            <InputField
              name="amount"
              type="number"
              placeholder="Enter Amount in CA$"
              title="Amount number must be bigger than zero"
              label="Custom amount CA$"
              error={errors.amount?.message || ''}
            />
            <div>
              <Button
                type="submit"
                disabled={!!Object.keys(errors).length || !amount}
                styles="p-2.5 rounded-2xl"
              >
                <MdDone size={24} />
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
}
