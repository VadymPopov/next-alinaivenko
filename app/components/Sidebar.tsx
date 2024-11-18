'use client';

import React from 'react';
import { MdAttachFile, MdDashboard, MdLogout, MdWork } from 'react-icons/md';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleExitClick = () => {
    router.push('/');
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-60 h-screen">
      <div className="flex flex-col h-full overflow-y-auto bg-mainDarkColor">
        <Image
          className="my-11 mx-auto rounded-full"
          width={80}
          height={80}
          src="/email-logo.png"
          alt="logo"
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
            current={pathname === '/admin/report'}
            pathname="/admin/report"
          >
            <MdAttachFile size={18} />
            Report
          </SidebarItem>
        </ul>
        <button
          className="flex items-center gap-2 p-6 mt-auto mx-auto text-textColorDarkBg hover:text-mainLightColor transition"
          onClick={handleExitClick}
        >
          <MdLogout size={18} />
          <span className="font-medium text-white">Logout</span>
        </button>
      </div>
    </aside>
  );
}
