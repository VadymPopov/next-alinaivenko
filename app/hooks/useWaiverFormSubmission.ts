import { useState } from 'react';

import { format } from 'date-fns';

import { postFetcher } from '../lib/axiosInstance';
import { IWaiverFormData } from '../providers/WaiverFormContext';

interface UnfilteredValues extends IWaiverFormData {
  lot: string;
  isClientUnder18: boolean;
  clientSignature: string;
  parentalConsent: boolean;
  parentalName: string;
  parentGovernmentId: string;
  parentalSignature: string;
}

interface FilteredValues {
  name: string;
  email: string;
  phone?: string | null;
  governmentId: string;
  dob: string;
  address: string;
  bodyPart: string;
  design: string;
  service: string;
  lot: string;
  appointmentDate: string;
  isClientUnder18: boolean;
  clientSignature?: string;
  parentalSignature?: string;
  parentalName?: string;
  parentGovernmentId?: string;
}

export function useWaiverSubmission() {
  const [isProcessing, setIsProcessing] = useState(false);

  const prepareFilteredValues = (values: UnfilteredValues): FilteredValues => ({
    name: values.name,
    email: values.email,
    phone: values.phone,
    governmentId: values.governmentId,
    dob: values.dob,
    address: values.address,
    bodyPart: values.bodyPart,
    design: values.design,
    service: values.service,
    lot: values.lot,
    appointmentDate: format(values.appointmentDate as string, 'yyyy-MM-dd'),
    isClientUnder18: values.isClientUnder18,
    ...(values.isClientUnder18
      ? {
          parentalSignature: values.parentalSignature,
          parentalName: values.parentalName,
          parentGovernmentId: values.parentGovernmentId,
        }
      : { clientSignature: values.clientSignature }),
  });

  const sendWaiverForm = async (data: FilteredValues) => {
    try {
      return await postFetcher('/api/waiverform', data);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Form submission failed.',
      );
    }
  };

  const submitForm = async (values: UnfilteredValues) => {
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
