'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import usePasswordStrength from '../hooks/usePasswordStrength';
import { validationSchemaProfileForm } from '../schemas';
import Button from './Button';
import InputField from './InputField';

interface FormValues {
  password: string;
  confirmPassword: string;
}

export default function ProfileForm({ id }: { id?: string }) {
  const { strengthColor, passwordStrength, validatePasswordStrength } =
    usePasswordStrength();
  const router = useRouter();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaProfileForm),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (formValues: FormValues) => {
    const { password } = formValues;
    try {
      const res = await fetch(`/api/users?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error(await res.text());

      toast.success('Password has been updated successfully!', {
        duration: 3000,
      });
      router.back();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    }
  };

  const password = watch('password');

  useEffect(() => {
    validatePasswordStrength(password);
  }, [password, validatePasswordStrength]);

  return (
    <FormProvider {...methods}>
      <form
        className="text-center bg-mainLightColor rounded-3xl shadow-lg px-4 py-6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex  items-center gap-3 mb-3">
          <h2 className="text-accentColor text-lg font-medium">
            Change Password:
          </h2>
          <div>
            <p style={{ color: strengthColor }}>{passwordStrength}</p>
          </div>
        </div>

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          error={errors.password?.message || ''}
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          error={errors.confirmPassword?.message || ''}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={Object.keys(errors).length !== 0}>
            Update
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
