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
        'px-5 py-12 md:px-10 md:py-16 lg:px-12 lg:py-20 xl:px-16 xl:py-24',
        primary ? 'bg-bgColor' : 'bg-mainLightColor',
      )}
    >
      {children}
    </section>
  );
}
