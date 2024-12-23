'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchemaStudioInfo } from '../schemas';
import AdminTitle from './AdminTitle';
import Button from './Button';
import InputField from './InputField';

interface FormValues {
  address: string;
  city: string;
  name: string;
  latitude: string;
  longitude: string;
}

export interface IStudioInfo {
  _id: string;
  address: string;
  city: string;
  name: string;
  latitude: string;
  longitude: string;
}

export default function StudioInfoForm() {
  const [studioInfo, setStudioInfo] = useState<IStudioInfo>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudioInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/admin/calendar/studio`);
        if (!response.ok) throw new Error('Failed to fetch studio information');
        const data = await response.json();
        setStudioInfo(data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Error fetching studio information.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudioInfo();
  }, []);

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaStudioInfo),
    defaultValues: {
      address: '',
      city: '',
      name: '',
      longitude: '',
      latitude: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (studioInfo) {
      methods.reset({
        address: studioInfo.address,
        city: studioInfo.city,
        name: studioInfo.name,
        longitude: studioInfo.longitude,
        latitude: studioInfo.latitude,
      });
    }
  }, [studioInfo, methods]);

  const onSubmitHandler = async (formValues: FormValues) => {
    try {
      setIsLoading(true);
      const id = studioInfo?._id;
      const method = id ? 'PUT' : 'POST';

      const queryParams = new URLSearchParams();
      if (id) queryParams.append('id', id);

      const res = await fetch(
        `/api/admin/calendar/studio?${queryParams.toString()}`,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formValues }),
        },
      );
      if (!res.ok) throw new Error(await res.text());
      toast.success('Studio Information was successfully updated!', {
        duration: 3000,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="py-2.5 px-4 md:py-4 md:px-8"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <AdminTitle title="Studio Address" />
        {/* <h2 className="text-accentColor font-semibold text-2xl">
          Studio Address
        </h2> */}
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
              isProcessing={isLoading}
              disabled={Object.keys(errors).length !== 0 || isLoading}
            >
              {isLoading ? 'Setting...' : 'Set'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
