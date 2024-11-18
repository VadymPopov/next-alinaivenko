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
      <body className="mx-auto my-0 flex min-h-screen flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <Sidebar />
        <main className="ml-60">{children}</main>
      </body>
    </html>
  );
}
