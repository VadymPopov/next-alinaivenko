import Header from '@/app/components/AdminHeader';
import Sidebar from '@/app/components/Sidebar';
import '@/app/datepicker.css';
import '@/app/globals.css';

import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { Metadata } from 'next';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin Panel',
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-bgColor">
        <Toaster position="top-center" reverseOrder={false} />
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-16 p-4  min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
