import React from 'react';
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from 'react-icons/hi';

export default function ExtendMenuBtn({
  toggleSidebar,
  isExtended,
}: {
  toggleSidebar: () => void;
  isExtended: boolean;
}) {
  return (
    <button
      className="text-textColorDarkBg p-3.5 hover:text-mainLightColor transition"
      onClick={toggleSidebar}
    >
      {isExtended ? (
        <HiOutlineMenuAlt3 size={18} />
      ) : (
        <HiOutlineMenuAlt2 size={18} />
      )}
    </button>
  );
}
