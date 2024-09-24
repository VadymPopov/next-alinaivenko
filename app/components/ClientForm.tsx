'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAppContext } from '../context/useGlobalState';
import { validationSchemaClient } from '../schemas';
import Button from './Button';
import FieldSet from './FieldSet';
import FileInput from './FileInput';
import InputField from './InputField';
import Text from './Text';

interface FormValues {
  phone?: string | null;
  instagram?: string;
  images?: File[] | null;
  description?: string;
  name: string;
  email: string;
}

export default function ClientForm() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { service, setAppointmentInfo } = useAppContext();

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
    setValue,
    setFocus,
    formState: { errors },
    trigger,
  } = methods;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmitHandler = async (formValues: FormValues) => {
    formValues.images = selectedFiles;
    const isValid = await trigger();

    if (isValid) {
      setAppointmentInfo(formValues);
      router.push('/booking/schedule');
    } else {
      console.log('Validation failed');
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFiles = Array.from(event.target.files || []);
    const combinedFiles = [...selectedFiles, ...newFiles];
    const uniqueFiles = combinedFiles.reduce((acc: File[], current) => {
      const existing = acc.find((file) => file.name === current.name);
      if (!existing) {
        acc.push(current);
      }
      return acc;
    }, []);

    setSelectedFiles(uniqueFiles);
    setValue('images', uniqueFiles);
    await trigger('images');
  };

  const handleDelete = async (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setValue('images', newFiles);
    await trigger('images');
  };

  console.log(Object.keys(errors).length);

  return (
    <FormProvider {...methods}>
      <form className="text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <FieldSet title="Fill out your information:">
          <InputField
            name="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            error={errors.name?.message || ''}
          />
          <InputField
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            title="Email must contain an “@” symbol before the domain"
            label="Email"
            error={errors.email?.message || ''}
          />
          <InputField
            name="phone"
            type="tel"
            placeholder="+1(111) 111-1111"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            label="Phone number"
            optional={true}
            error={errors.phone?.message || ''}
          />
          <InputField
            name="instagram"
            type="text"
            placeholder="@username"
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
            onChange={handleFileChange}
            error={errors.images?.message || ''}
          />
          <div className="flex justify-center mb-5">
            <ul className="sm:grid grid-cols-2 gap-4">
              {selectedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    width={200}
                    height={200}
                    className=" border-mainDarkColor rounded-xl object-cover mb-2 h-[200px]"
                  />
                  <button
                    type="button"
                    className="text-error mb-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

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
          <Button type="submit" disabled={Object.keys(errors).length !== 0}>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
