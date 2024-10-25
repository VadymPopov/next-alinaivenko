'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import { useAppContext } from '../context/useGlobalState';
import { validationSchemaPaymentForm } from '../schemas';
import Button from './Button';
import FieldSet from './FieldSet';
import InputField from './InputField';

interface FormValues {
  amount: number;
  name: string;
  email: string;
}

export default function PaymentForm() {
  const router = useRouter();
  const { paymentInfo, setPaymentInfo } = useAppContext();

  const onSubmitHandler = (values: FormValues) => {
    setPaymentInfo(values);
    router.push('/payment/tip-amount');
  };

  const methods = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(validationSchemaPaymentForm),
    defaultValues: {
      name: paymentInfo?.name || '',
      email: paymentInfo?.email || '',
      amount: paymentInfo?.amount || undefined,
    },
  });

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Fill out your information:">
          <InputField
            name="name"
            label="Full Name"
            type="text"
            placeholder="Enter First and Last Name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            error={errors.name?.message || ''}
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
            name="amount"
            type="number"
            placeholder="Enter Amount in CA$"
            title="Amount number must be bigger than zero"
            label="Amount CA$"
            error={errors.amount?.message || ''}
          />
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={Object.keys(errors).length !== 0}>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}