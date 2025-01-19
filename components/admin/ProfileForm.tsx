'use client';

import { Button, InputField } from '@/components/ui';
import { usePasswordStrength } from '@/hooks';
import { postFetcher } from '@/lib/axiosFetchers';
import { validationSchemaProfileForm } from '@/schemas';
import { ProfileFormValues } from '@/types';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

export function ProfileForm({ id }: { id?: string }) {
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

  const password = watch('password');

  useEffect(() => {
    validatePasswordStrength(password);
  }, [password, validatePasswordStrength]);

  const onSubmitHandler = async (formValues: ProfileFormValues) => {
    try {
      await postFetcher(`/api/users?id=${id}`, {
        password: formValues.password,
      });

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
          <Button type="submit" disabled={!!Object.keys(errors).length}>
            Update
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
