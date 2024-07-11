import { Metadata } from 'next';
import Navigation from '@/app/components/Navigation';
import '@/app/globals.css';

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
        <Navigation />
        <main className="mt-[92px] flex-1 xl:mt-[104px]">{children}</main>
      </body>
    </html>
  );
}
