export interface StepOneFormValues {
  name: string;
  email: string;
  phone?: string | null;
  governmentId: string;
  dob: string;
  address: string;
}

export interface StepTwoFormValues {
  service: string;
  bodyPart: string;
  design: string;
  appointmentDate: string;
}

export interface StepThreeFormValues {
  waveRelease?: boolean;
}

export interface StepFourFormValues {
  pain?: boolean;
  infection?: boolean;
  healing?: boolean;
  outcome?: boolean;
}

export interface StepFiveFormValues {
  refund?: boolean;
  permanentChange?: boolean;
  media?: boolean;
  age?: boolean;
}

export interface StepSixFormValues {
  drugs?: boolean;
  disease?: boolean;
  medication?: boolean;
  skin?: boolean;
  recipientOrgan?: boolean;
  pregnancy?: boolean;
}

export interface StepSevenFormValues {
  lot: string;
  agreement?: boolean;
  clientSignature?: string;
  parentalConsent?: boolean;
  parentalName?: string;
  parentGovernmentId?: string;
  parentalSignature?: string;
}

export interface WaiverFormData {
  name: string;
  email: string;
  phone?: string | null;
  governmentId: string;
  dob: string;
  address: string;

  bodyPart: string;
  design: string;
  service: string;
  appointmentDate: string;

  waveRelease: boolean;

  pain: boolean;
  infection: boolean;
  healing: boolean;
  outcome: boolean;

  refund: boolean;
  permanentChange: boolean;
  media: boolean;
  age: boolean;

  drugs: boolean;
  disease: boolean;
  medication: boolean;
  skin: boolean;
  recipientOrgan: boolean;
  pregnancy: boolean;

  agreement: boolean;
  lot: string;
  clientSignature: string;
  parentalSignature: string;
  parentalConsent: boolean;
  parentalName: string;
  parentGovernmentId: string;
}

export interface WaiverFormContext {
  formData: WaiverFormData;
  updateFormData: (_newData: Partial<WaiverFormData>) => void;
  isClientUnder18: boolean;
  setIsClientUnder18: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UnfilteredWaiverFormValues extends WaiverFormData {
  lot: string;
  isClientUnder18: boolean;
  clientSignature: string;
  parentalConsent: boolean;
  parentalName: string;
  parentGovernmentId: string;
  parentalSignature: string;
}

export interface FilteredWaiverFormValues {
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
