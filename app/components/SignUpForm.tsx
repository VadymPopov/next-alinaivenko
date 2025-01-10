'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchemaSignUp } from '../schemas';
import Button from './Button';
import InputField from './InputField';

interface FormValues {
  email: string;
  password: string;
  name: string;
  role: string;
}

export default function SignUpForm() {
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaSignUp),
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
    const { name, email, role, password } = formValues;
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('User has been added!', {
        duration: 3000,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="text-center bg-mainLightColor rounded-3xl shadow-lg px-4 py-6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
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
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          error={errors.password?.message || ''}
        />
        <InputField
          name="role"
          label="Role"
          type="text"
          placeholder="Enter Your Role"
          error={errors.role?.message || ''}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={!!Object.keys(errors).length}>
            Sign Up
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
