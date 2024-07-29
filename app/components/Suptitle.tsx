import { ReactNode } from 'react';
import clsx from 'clsx';

type SuptitleProps = {
  children: ReactNode;
  primary?: boolean;
};

export default function Suptitle({ children, primary }: SuptitleProps) {
  return (
    <h3
      className={clsx(
        'my-5 flex items-center text-xs font-semibold uppercase before:mr-5 before:block before:h-[1px] before:w-16 before:content-[""]',
        primary
          ? 'text-mainDarkColor before:bg-mainDarkColor'
          : 'text-textColorDarkBg before:bg-textColorDarkBg',
      )}
    >
      {children}
    </h3>
  );
}
