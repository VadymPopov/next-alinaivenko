import { type WaiverFormContext, WaiverFormData } from '@/types';

import React, { createContext, useContext, useState } from 'react';

const initialFormData: WaiverFormData = {
  name: '',
  email: '',
  phone: '',
  governmentId: '',
  dob: '',
  address: '',
  bodyPart: '',
  design: '',
  service: 'Tattoo',
  appointmentDate: '',
  waveRelease: false,
  pain: false,
  infection: false,
  healing: false,
  outcome: false,
  refund: false,
  permanentChange: false,
  media: false,
  age: false,
  drugs: false,
  disease: false,
  medication: false,
  skin: false,
  recipientOrgan: false,
  pregnancy: false,
  agreement: false,
  lot: '',
  clientSignature: '',
  parentalSignature: '',
  parentalConsent: false,
  parentalName: '',
  parentGovernmentId: '',
};

const WaiverFormContext = createContext<WaiverFormContext | undefined>(
  undefined,
);

export const useWaiverFormContext = () => {
  const context = useContext(WaiverFormContext);
  if (!context) {
    throw new Error(
      'useWaiverFormContext must be used within a WaiverFormProvider',
    );
  }
  return context;
};

export const WaiverFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<WaiverFormData>(initialFormData);
  const [isClientUnder18, setIsClientUnder18] = useState(false);
  const updateFormData = (newData: Partial<WaiverFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };
  return (
    <WaiverFormContext.Provider
      value={{ formData, updateFormData, isClientUnder18, setIsClientUnder18 }}
    >
      {children}
    </WaiverFormContext.Provider>
  );
};
