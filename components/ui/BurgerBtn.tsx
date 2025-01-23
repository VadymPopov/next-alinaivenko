import React from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';

export function BurgerBtn({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) {
  return (
    <button
      onClick={toggleMenu}
      className="lg:hidden text-white h-10 w-10 cursor-pointer border-none bg-transparent outline-none z-50"
      aria-label="mobile-menu-toggle"
    >
      {isOpen ? (
        <CgClose
          className="h-8 w-8 text-mainLightColor"
          data-testid="icon-close"
        />
      ) : (
        <CgMenu
          className="h-8 w-8 text-mainLightColor"
          data-testid="icon-open"
        />
      )}
    </button>
  );
}
