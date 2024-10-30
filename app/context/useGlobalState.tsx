'use client';

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface IAppContext {
  service: 'small-tattoo' | 'large-tattoo' | 'permanent' | 'touch-up' | null;
  setService: Dispatch<
    SetStateAction<
      'small-tattoo' | 'large-tattoo' | 'permanent' | 'touch-up' | null
    >
  >;
  appointmentInfo: IAppointmentInfo | null;
  setAppointmentInfo: Dispatch<SetStateAction<IAppointmentInfo | null>>;
  paymentInfo: IPaymentInfo | null;
  setPaymentInfo: Dispatch<SetStateAction<IPaymentInfo | null>>;
}

interface IAppointmentInfo {
  name?: string;
  email?: string;
  phone?: string | null;
  images?: string[] | null;
  description?: string;
  instagram?: string;
  address?: string;
}

interface IPaymentInfo {
  name?: string;
  email?: string;
  amount?: number;
  tip?: number;
  taxes?: number;
  total?: number;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [service, setService] = useState<
    'small-tattoo' | 'large-tattoo' | 'permanent' | 'touch-up' | null
  >(null);
  const [appointmentInfo, setAppointmentInfo] =
    useState<IAppointmentInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo | null>(null);

  return (
    <AppContext.Provider
      value={{
        service,
        setService,
        appointmentInfo,
        setAppointmentInfo,
        paymentInfo,
        setPaymentInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
