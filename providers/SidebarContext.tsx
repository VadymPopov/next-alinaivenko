'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type SidebarContextType = {
  isExtended: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isExtended, setIsExtended] = useState(true);

  const toggleSidebar = () => {
    setIsExtended((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isExtended, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarContext');
  }
  return context;
};
