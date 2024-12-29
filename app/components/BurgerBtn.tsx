import React from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';

export default function BurgerBtn({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) {
  return (
    <button
      onClick={toggleMenu}
      className="md:hidden text-white h-10 w-10 cursor-pointer border-none bg-transparent outline-none z-50"
      aria-label="mobile-menu-toggle"
    >
      {isOpen ? (
        <CgClose className="h-8 w-8 text-mainLightColor" />
      ) : (
        <CgMenu className="h-8 w-8 text-mainLightColor" />
      )}
    </button>
  );
}
