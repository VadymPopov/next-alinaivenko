import { ReactNode } from 'react';

import clsx from 'clsx';

interface TitleProps {
  children: ReactNode;
  mobile?: boolean;
}

export function Title({ children, mobile }: TitleProps) {
  return (
    <h2
      className={clsx(
        'mb-2.5 font-raleway text-2xl font-semibold tracking-normal text-mainDarkColor sm:text-4xl lg:mb-5 lg:text-[42px] lg:font-bold lg:tracking-wider',
        mobile ? 'text-end' : 'text-start',
      )}
    >
      {children}
    </h2>
  );
}
