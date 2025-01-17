import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const useImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const methods = useFormContext();

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
    methods?.setValue('images', uniqueFiles);
    await methods?.trigger('images');
  };

  const handleDelete = async (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    methods?.setValue('images', newFiles);
    await methods?.trigger('images');
  };

  return {
    selectedFiles,
    handleFileChange,
    handleDelete,
  };
};
