'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuProps {
  onClick?: () => void;
  menu: { path: string; label: string }[];
}

export function Menu({ onClick, menu }: MenuProps) {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <ul className="mt-10 lg:m-0 flex list-none flex-col items-center p-0 lg:flex-row lg:justify-center xl:mb-5 xl:mr-5">
      {menu.map(({ path, label }) => {
        return (
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            key={label}
            className="mb-5 lg:mb-0 lg:mr-8 lg:last:mr-0"
            onClick={onClick}
          >
            <Link
              href={path}
              className={clsx(
                ' block whitespace-nowrap px-2 py-1 text-xl font-semibold tracking-widest no-underline transition-colors hover:text-accentColor focus:text-accentColor md:text-2xl lg:text-sm xl:text-lg ',
                isActive(path) ? 'text-accentColor' : 'text-mainLightColor',
              )}
            >
              {label}
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
