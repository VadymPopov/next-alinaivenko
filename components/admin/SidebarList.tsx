import SidebarItem from '@/components/admin/SidebarItem';
import { SIDEBAR_MENU } from '@/constants';

import React from 'react';

export default function SidebarList({
  pathname,
  isExtended,
}: {
  pathname: string;
  isExtended: boolean;
}) {
  return (
    <ul className="space-y-7">
      {SIDEBAR_MENU.map((item) => (
        <SidebarItem
          key={item.path}
          current={pathname === item.path}
          pathname={item.path}
        >
          {React.createElement(item.icon, { size: 18 })}
          {isExtended && item.label}
        </SidebarItem>
      ))}
    </ul>
  );
}
