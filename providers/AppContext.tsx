'use client';

import {
  type AppContext,
  AppointmentInfo,
  PaymentInfo,
  serviceType,
} from '@/types';

import React, { ReactNode, createContext, useContext, useState } from 'react';

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [service, setService] = useState<serviceType | null>(null);
  const [appointmentInfo, setAppointmentInfo] =
    useState<AppointmentInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

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
