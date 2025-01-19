import Button from '@/components/ui/Button';
import { useSidebar } from '@/providers/SidebarContext';
import { Appointment, SearchDate } from '@/types';
import { downloadCSV, generateCSV } from '@/utils/csvUtils';
import { getDateString } from '@/utils/helpers';

import { useRef } from 'react';
import { MdAdd, MdDownload } from 'react-icons/md';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function Flyout({
  appointments,
  date,
}: {
  appointments: Appointment[];
  date: SearchDate;
}) {
  const { isExtended } = useSidebar();
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dateString = getDateString(date);
  const message = `${appointments.length} appointment${appointments.length > 1 ? 's' : ''} selected`;
  const filename = `${appointments.length}_appointment${appointments.length > 1 ? 's' : ''}_${dateString}.csv`;

  const handleDownload = () => {
    if (!linkRef.current) return;

    const csvData = generateCSV(appointments);
    downloadCSV(csvData, filename, linkRef.current);
  };

  return (
    <div
      className={clsx(
        isExtended ? 'md:left-64' : 'md:left-16',
        'fixed top-16 right-0 left-0 shadow-lg bg-gradient-to-r from-textColorDarkBg from-10%  to-bgColor to-80% p-3 flex justify-between items-center px-8 py-2.5 transition-all z-40',
      )}
    >
      <p className="font-semibold md:text-lg xl:text-xl text-mainLightColor">
        {message}
      </p>
      <div className="flex gap-2.5">
        {appointments.length > 0 && (
          <Button
            onClick={handleDownload}
            styles=" rounded-full p-2 md:rounded-xl md:px-3 md:py-2 md:h-10"
          >
            <span className="hidden md:block">Download</span>
            <MdDownload className="size-6" />
          </Button>
        )}
        <Button
          styles="rounded-full p-2 md:rounded-xl md:px-3 md:py-2 md:h-10"
          onClick={() =>
            router.push('/admin/appointments/add', { scroll: false })
          }
        >
          <span className="hidden md:block">Add Appointment</span>
          <MdAdd className="size-6" />
        </Button>
      </div>

      <a ref={linkRef} className="hidden" />
    </div>
  );
}
