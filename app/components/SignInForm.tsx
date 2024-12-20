'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdLogin } from 'react-icons/md';

import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';

import { validationSchemaSignIn } from '../schemas';
import Button from './Button';
import InputField from './InputField';

interface FormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [authError, setAuthError] = useState<string | null>(null);

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaSignIn),
  });

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmitHandler = async (formValues: FormValues) => {
    const { email, password } = formValues;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError('Invalid email or password. Please try again.');
    } else {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="text-center bg-mainLightColor rounded-3xl shadow-lg px-4 py-6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <InputField
          name="email"
          type="email"
          placeholder="Enter Email"
          title="Email must contain an “@” symbol before the domain"
          label="Email"
          error={errors.email?.message || ''}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          error={errors.password?.message || ''}
        />
        {authError && (
          <div className="text-error mb-4 text-sm">{authError}</div>
        )}
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={Object.keys(errors).length !== 0}>
            Sign In <MdLogin size={24} className="ml-2.5" />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
