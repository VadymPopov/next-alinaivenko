import { ReactNode } from 'react';
import clsx from 'clsx';

type TextProps = {
  children: ReactNode;
  primary?: boolean;
  main?: boolean;
};

export default function Text({ children, primary, main }: TextProps) {
  return (
    <p
      className={clsx(
        'text-justify indent-3 text-sm sm:indent-5 sm:text-lg lg:indent-8',
        primary ? 'text-textColor' : 'text-mainDarkColor',
        main ? 'mb-5' : 'mb-0',
      )}
    >
      {children}
    </p>
  );
}
