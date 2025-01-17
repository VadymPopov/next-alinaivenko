import { ReactNode } from 'react';

import clsx from 'clsx';

type SuptitleProps = {
  children: ReactNode;
  primary?: boolean;
};

export default function Section({ children, primary }: SuptitleProps) {
  return (
    <section
      className={clsx(
        'px-5 py-8',
        primary ? 'bg-bgColor' : 'bg-mainLightColor',
      )}
    >
      {children}
    </section>
  );
}
