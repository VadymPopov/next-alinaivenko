import Header from '@/app/components/AdminHeader';
import Sidebar from '@/app/components/Sidebar';
import '@/app/datepicker.css';
import '@/app/globals.css';
import { getSession } from '@/auth';

import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import MainContent from '../components/AdminMain';
import AuthProvider from '../providers/SessionProvider';
import { SidebarProvider } from '../providers/SidebarContext';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin Panel',
  },
};

export default async function RootLayout({ children, modal }: Props) {
  const session = await getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <html lang="en">
      <body className="flex h-screen bg-bgColor">
        <SidebarProvider>
          <AuthProvider session={session}>
            <Toaster position="top-center" reverseOrder={false} />
            <Sidebar />
            <div className="flex-1">
              <Header />
              <MainContent>
                {modal}
                {children}
              </MainContent>
            </div>
          </AuthProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
