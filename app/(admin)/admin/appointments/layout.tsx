import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      {modal}
      <main>{children}</main>
    </>
  );
}
