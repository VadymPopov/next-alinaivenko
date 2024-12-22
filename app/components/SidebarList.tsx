import React from 'react';
import { MdDashboard, MdOutlineEditCalendar, MdWork } from 'react-icons/md';

import SidebarItem from './SidebarItem';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/admin/appointments', label: 'Appointments', icon: MdWork },
  { path: '/admin/calendar', label: 'Calendar', icon: MdOutlineEditCalendar },
];

export default function SidebarList({
  pathname,
  isExtended,
}: {
  pathname: string;
  isExtended: boolean;
}) {
  return (
    <ul className="space-y-7">
      {menuItems.map((item) => (
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
