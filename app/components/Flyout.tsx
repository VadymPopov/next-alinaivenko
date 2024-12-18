import { useRef } from 'react';
import { MdAdd, MdDownload } from 'react-icons/md';

import { useRouter } from 'next/navigation';

import { IDate } from '../(admin)/admin/appointments/page';
import { downloadCSV, generateCSV } from '../utils/csvUtils';
import { getDateString } from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
import Button from './Button';

export default function Flyout({
  appointments,
  date,
}: {
  appointments: IAppointment[];
  date: IDate;
}) {
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
    <div className="fixed top-16 left-64 right-0 shadow-lg bg-gradient-to-r from-textColorDarkBg from-10%  to-bgColor to-80% z-50 p-3 flex justify-between items-center px-10 py-2.5">
      <p className="font-semibold text-xl text-mainLightColor">{message}</p>
      <div className="flex gap-2.5">
        {appointments.length > 0 && (
          <Button onClick={handleDownload}>
            Download
            <MdDownload size={24} />
          </Button>
        )}
        <Button
          styles="rounded-xl px-3 py-2 h-10 mb-5"
          onClick={() =>
            router.push('/admin/appointments/add', { scroll: false })
          }
        >
          Add Appointment
          <MdAdd size={24} />
        </Button>
      </div>

      <a ref={linkRef} className="hidden" />
    </div>
  );
}
