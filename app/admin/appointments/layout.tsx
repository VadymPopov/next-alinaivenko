import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      {modal}
      <div className="pt-16 min-h-screen">{children}</div>
    </>
  );
}
