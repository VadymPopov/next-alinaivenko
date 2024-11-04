import Footer from '@/app/components/Footer';
import Navigation from '@/app/components/Navigation';
import '@/app/datepicker.css';
import '@/app/globals.css';

import { Toaster } from 'react-hot-toast';

import { Metadata } from 'next';

import { AppProvider } from '../context/useGlobalState';

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
  return (
    <html lang="en">
      <body className="mx-auto my-0 flex min-h-screen flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <Navigation />
        <main className="mt-[92px] flex-1 xl:mt-[104px]">
          <AppProvider>{children}</AppProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
