import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <div>Admin Layout</div>
      {children}
    </div>
  );
}
