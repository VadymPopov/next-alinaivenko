'use client';

import { Button, FieldSet, FileInput, InputField, Text } from '@/components/ui';
import { useAppContext } from '@/providers/AppContext';
import { validationSchemaClient } from '@/schemas';
import { ClientFormValues } from '@/types';
import { getBase64 } from '@/utils';
import { pickDuration } from '@/utils/helpers';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

export function ClientForm() {
  const router = useRouter();
  const { service, setAppointmentInfo, appointmentInfo } = useAppContext();
  const duration = pickDuration(service);

  useEffect(() => {
    if (!service) {
      router.replace('/booking');
    }
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaClient),
  });

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
    trigger,
  } = methods;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmitHandler = async (formValues: ClientFormValues) => {
    const isValid = await trigger();

    const imagesArray = Array.from(formValues?.images ?? []);
    const imagesBase64 = await Promise.all(
      imagesArray.map(async (image) => await getBase64(image)),
    );

    if (isValid) {
      setAppointmentInfo({
        ...appointmentInfo,
        ...formValues,
        images: imagesBase64,
      });
      router.push(`/booking/schedule?duration=${duration}`);
    } else {
      console.log('Validation failed');
    }
  };

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
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            label="Phone number"
            optional={true}
            error={errors.phone?.message || ''}
          />
          <InputField
            name="instagram"
            type="text"
            placeholder="Enter instagram @username"
            label="Instagram"
            title="Instagram username"
            optional={true}
          />
        </FieldSet>
        <Text>
          If you have a tattoo concept in mind or a rough sketch, please upload
          1 to 3 images that best represent your idea, including your main
          concept or sketch, and any additional images for inspiration or style.
        </Text>
        <FieldSet title="Add your tattoo idea:">
          <FileInput
            name="images"
            type="file"
            accept="image/*"
            label="Please upload images (max 3)"
            multiple={true}
            optional={true}
            error={errors.images?.message || ''}
          />

          <InputField
            name="description"
            placeholder="Enter a brief description of your idea or any additional details here..."
            label="Brief Description"
            type="text"
            optional={true}
            textarea={true}
          />
        </FieldSet>
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={!!Object.keys(errors).length}>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
