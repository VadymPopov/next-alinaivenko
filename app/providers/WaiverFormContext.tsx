import React, { createContext, useContext, useState } from 'react';

export interface IWaiverFormData {
  // Step 1 - Personal Info
  name: string;
  email: string;
  phone?: string | null;
  governmentId: string;
  dob: string;
  address: string;

  // Step 2 - Service Details
  bodyPart: string;
  design: string;
  service: string;
  appointmentDate: string;

  // Step 3 - Waiver Release
  waveRelease: boolean;

  // Step 4 - Health Acknowledgment
  pain: boolean;
  infection: boolean;
  healing: boolean;
  outcome: boolean;

  // Step 5 - Consent and Agreement
  refund: boolean;
  permanentChange: boolean;
  media: boolean;
  age: boolean;

  // Step 6 - Health Conditions
  drugs: boolean;
  disease: boolean;
  medication: boolean;
  skin: boolean;
  recipientOrgan: boolean;
  pregnancy: boolean;

  // Step 7 - Minor Agreement (Conditional)
  agreement: boolean;
  lot: string;
  clientSignature: string;
  parentalSignature: string;
  parentalConsent: boolean;
  parentalName: string;
  parentGovernmentId: string;
}

interface IWaiverFormContext {
  formData: IWaiverFormData;
  updateFormData: (_newData: Partial<IWaiverFormData>) => void;
  isClientUnder18: boolean;
  setIsClientUnder18: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialFormData: IWaiverFormData = {
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

const WaiverFormContext = createContext<IWaiverFormContext | undefined>(
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
  const [formData, setFormData] = useState<IWaiverFormData>(initialFormData);
  const [isClientUnder18, setIsClientUnder18] = useState(false);
  const updateFormData = (newData: Partial<IWaiverFormData>) => {
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
