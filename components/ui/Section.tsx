import { ReactNode } from 'react';

import clsx from 'clsx';

interface SectionProps {
  children: ReactNode;
  primary?: boolean;
}

export function Section({ children, primary }: SectionProps) {
  return (
    <section
      data-testid="section"
      className={clsx(
        'px-5 py-8',
        primary ? 'bg-bgColor' : 'bg-mainLightColor',
      )}
    >
      {children}
    </section>
  );
}
