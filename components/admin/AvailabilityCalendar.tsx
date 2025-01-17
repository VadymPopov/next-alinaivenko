'use client';

import AdminTitle from '@/components/admin/AdminTitle';
import Button from '@/components/ui/Button';
import { getFetcher } from '@/lib/axiosInstance';
import { updateBlockedDates } from '@/lib/calendar';
import { arraysAreEqual, isNewDate } from '@/utils/helpers';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

import useSWR from 'swr';

const CALENDAR_API = '/api/admin/calendar';

export default function AvailabilityCalendar({
  initialDates,
}: {
  initialDates: string[];
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });

  const calendarApiUrl = `${CALENDAR_API}?month=${currentMonth}&year=${currentYear}`;

  const { data, mutate, error, isLoading } = useSWR<string[]>(
    calendarApiUrl,
    getFetcher,
    {
      fallback: initialDates,
    },
  );

  const dates = useMemo(
    () => data?.map((date) => new Date(date)) || [],
    [data],
  );

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    setSelectedDates(dates);
  }, [dates]);

  const handleDateChange = useCallback(
    (dates: Date[] | null) => setSelectedDates(dates || []),
    [],
  );

  const handleMonthChange = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  const handleSave = async () => {
    if (!selectedDates.length) return;

    try {
      await updateBlockedDates(
        selectedDates,
        mutate,
        currentMonth,
        currentYear,
      );
      toast.success('Blocked dates saved successfully!', {
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : 'Error saving blocked dates',
      );
    }
  };

  const hasChanges = arraysAreEqual(selectedDates, dates);

  if (error) {
    return (
      <p className="text-error">
        Failed to load blocked dates. Please try again later.
      </p>
    );
  }

  return (
    <div className="py-2.5 px-4 md:py-4 md:px-8">
      <div className="schedule xl:grid grid-cols-2 items-start gap-6">
        <div className="flex items-center justify-center mb-8 xl:mb-0">
          <DatePicker
            showDateSelect
            minDate={new Date()}
            inline
            selectsMultiple
            showPopperArrow={false}
            selectedDates={selectedDates}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <div>
            <AdminTitle
              title={`Blocked Dates (Days off): ${currentMonth} ${currentYear}`}
              className="pb-4 border-b"
            />
            {selectedDates.length === 0 ? (
              <span className="md:text-lg text-gray-500 text-center block p-4">
                No blocked dates selected.
              </span>
            ) : (
              <ul className="p-4 grid grid-cols-2 gap-x-4">
                {selectedDates.map((date, index) => (
                  <li
                    key={index}
                    className={`text-sm md:text-lg font-medium text-mainDarkColor ${
                      isNewDate(date, dates) && 'flex'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('default', {
                      day: '2-digit',
                      month: 'long',
                    })}
                    {isNewDate(date, dates) && (
                      <span className="rounded-lg px-1 py-0.5 block ml-0.5 mb-2 text-xs text-[#0077B6] bg-[#D0EFFF]">
                        New
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Button
          onClick={handleSave}
          type="submit"
          disabled={isLoading || hasChanges}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
