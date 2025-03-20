import { Footer, Navigation } from '@/components/site';
import { AppProvider } from '@/providers/AppContext';
import { getStudioInfo } from '@/services';
import '@/styles/datepicker.css';
import '@/styles/globals.css';
import { StudioInfo } from '@/types';

import React, { use } from 'react';
import { Toaster } from 'react-hot-toast';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Ivenko Alina',
    default: 'Ivenko Alina',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const studio: StudioInfo | null = use(getStudioInfo());

  return (
    <html lang="en">
      <body className="mx-auto my-0 flex min-h-screen flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <Navigation />
        <main className="flex-1">
          <AppProvider>{children}</AppProvider>
        </main>

        <Footer studio={studio} />
      </body>
    </html>
  );
}
