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
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  );
}
