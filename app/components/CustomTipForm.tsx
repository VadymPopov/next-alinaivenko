'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdDone } from 'react-icons/md';

import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchemaCustomTip } from '../schemas';
import Button from './Button';
import InputField from './InputField';

interface FormValues {
  amount: number;
}

interface CustomTipFormProps {
  setTip: React.Dispatch<React.SetStateAction<number>>;
  showCustomTipForm: boolean;
  setShowCustomTipForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomTipForm({
  setTip,
  showCustomTipForm,
  setShowCustomTipForm,
}: CustomTipFormProps) {
  const onSubmitHandler = (values: FormValues) => {
    const { amount } = values;
    setTip(amount);
    setShowCustomTipForm(false);
  };

  const methods = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(validationSchemaCustomTip),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

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
                disabled={Object.keys(errors).length !== 0}
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
