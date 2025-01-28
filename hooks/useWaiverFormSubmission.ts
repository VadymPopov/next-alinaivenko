'use client';

import { postFetcher } from '@/lib/axiosFetchers';
import { FilteredWaiverFormValues, UnfilteredWaiverFormValues } from '@/types';
import { prepareFilteredValues } from '@/utils/helpers';

import { useState } from 'react';

export function useWaiverFormSubmission() {
  const [isProcessing, setIsProcessing] = useState(false);

  const sendWaiverForm = async (data: FilteredWaiverFormValues) => {
    try {
      return await postFetcher('/api/waiverform', data);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    }
  };

  const submitForm = async (values: UnfilteredWaiverFormValues) => {
    setIsProcessing(true);
    try {
      const filteredValues = prepareFilteredValues(values);
      await sendWaiverForm(filteredValues);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, submitForm };
}
