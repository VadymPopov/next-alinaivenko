import { ReactNode } from 'react';

import clsx from 'clsx';

interface TextProps {
  children: ReactNode;
  primary?: boolean;
  main?: boolean;
}

export function Text({ children, primary, main }: TextProps) {
  return (
    <p
      className={clsx(
        'text-justify indent-3 text-sm leading-[1.67] tracking-wide sm:indent-5 md:text-lg lg:indent-8',
        primary ? 'text-textColor' : 'text-mainDarkColor',
        main ? 'mb-5' : 'mb-0',
      )}
    >
      {children}
    </p>
  );
}
