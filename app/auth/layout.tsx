import { getSession } from '@/lib/auth';
import '@/styles/globals.css';

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign In',
  description: 'Sign In to the Admin Panel',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    redirect('/admin/dashboard');
  }

  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-bgColor">
        {children}
      </body>
    </html>
  );
}
