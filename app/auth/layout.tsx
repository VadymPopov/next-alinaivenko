import '@/app/globals.css';

export const metadata = {
  title: 'Sign In',
  description: 'Sign In to the Admin Panel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-bgColor">
        {children}
      </body>
    </html>
  );
}
