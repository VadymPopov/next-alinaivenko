import Header from '@/app/components/AdminHeader';
import Sidebar from '@/app/components/Sidebar';
import '@/app/datepicker.css';
import '@/app/globals.css';
import { getSession } from '@/auth';

import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Provider from '../providers/SessionProvider';

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
        <Provider session={session}>
          <Toaster position="top-center" reverseOrder={false} />
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header />
            <main className="mt-16 p-4  min-h-screen">
              {modal}
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
