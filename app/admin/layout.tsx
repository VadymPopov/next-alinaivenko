import { Header, MainContent, Sidebar } from '@/components/admin';
import { getSession } from '@/lib/auth';
import AuthProvider from '@/providers/SessionProvider';
import { SidebarProvider } from '@/providers/SidebarContext';
import '@/styles/datepicker.css';
import '@/styles/globals.css';

import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin Panel',
  },
};

export default async function RootLayout({
  children,
  modal,
}: AdminLayoutProps) {
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
