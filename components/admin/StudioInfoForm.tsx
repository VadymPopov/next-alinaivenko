'use client';

import { AdminTitle } from '@/components/admin';
import { Button, InputField } from '@/components/ui';
import { useStudioInfo } from '@/hooks';
import { validationSchemaStudioInfo } from '@/schemas';
import { StudioFormValues, StudioInfo } from '@/types';

import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

export function StudioInfoForm({ studio }: { studio: StudioInfo }) {
  const { data, error, isLoading, updateStudioInfo, isValidating } =
    useStudioInfo(studio);

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaStudioInfo),
    defaultValues: {
      address: data.address || '',
      city: data.city || '',
      name: data.name || '',
      longitude: data.longitude || '',
      latitude: data.latitude || '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const formValues = watch();

  const isDataEqualToFormValues = useMemo(() => {
    return (
      data?.address === formValues.address &&
      data?.city === formValues.city &&
      data?.name === formValues.name &&
      data?.latitude === formValues.latitude &&
      data?.longitude === formValues.longitude
    );
  }, [data, formValues]);

  const onSubmitHandler = async (formValues: StudioFormValues) => {
    try {
      await updateStudioInfo({ id: data._id, ...formValues });
      toast.success('Studio Information was successfully updated!', {
        duration: 3000,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    }
  };

  if (error) {
    return <p className="text-error">Failed to load studio info.</p>;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="py-2.5 px-4 md:py-4 md:px-8"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <AdminTitle title="Studio Address" />
        <div className="text-center">
          <InputField
            name="name"
            title="Studio Name"
            label="Studio Name"
            placeholder="Enter Studio Name"
            error={errors.name?.message}
            type="text"
          />
          <InputField
            name="city"
            title="City"
            label="City"
            placeholder="Enter City"
            error={errors.city?.message}
            type="text"
          />
          <InputField
            name="address"
            label="Address"
            title="Studio Address"
            placeholder="Enter Studio Address"
            error={errors.address?.message}
            type="text"
          />
          <InputField
            name="latitude"
            title="Latitude"
            label="Map Latitude"
            placeholder="Enter latitude"
            error={errors.latitude?.message}
            type="text"
          />
          <InputField
            name="longitude"
            title="Longitude"
            label="Map Longitude"
            placeholder="Enter longitude"
            error={errors.longitude?.message}
            type="text"
          />
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              isProcessing={isLoading || isValidating}
              disabled={
                isDataEqualToFormValues ||
                !!Object.keys(errors).length ||
                isLoading ||
                isValidating
              }
            >
              {isLoading || isValidating ? 'Setting...' : 'Set'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
