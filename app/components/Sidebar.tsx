'use client';

import React from 'react';
import {
  MdDashboard,
  MdLogout,
  MdOutlineEditCalendar,
  MdWork,
} from 'react-icons/md';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-800 text-white fixed h-full">
      <div className="flex flex-col h-full overflow-y-auto  bg-gradient-to-b from-mainDarkColor from-10%  to-cardColor to-80%">
        <Image
          className="my-11 mx-auto rounded-full cursor-pointer"
          width={80}
          height={80}
          src="/email-logo.png"
          alt="logo"
          onClick={() => router.push('/admin/dashboard')}
        />
        <ul className="space-y-7">
          <SidebarItem
            current={pathname === '/admin/dashboard'}
            pathname="/admin/dashboard"
          >
            <MdDashboard size={18} />
            Dashboard
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/appointments'}
            pathname="/admin/appointments"
          >
            <MdWork size={18} />
            Appointments
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/calendar'}
            pathname="/admin/calendar"
          >
            <MdOutlineEditCalendar size={18} />
            Calendar
          </SidebarItem>
        </ul>
        <button
          className="flex items-center gap-2 p-6 mt-auto mx-auto text-textColorDarkBg hover:text-mainLightColor transition"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <MdLogout size={18} />
          <span className="font-medium text-white">Logout</span>
        </button>
      </div>
    </aside>
  );
}
