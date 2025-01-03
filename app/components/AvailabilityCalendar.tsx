'use client';

import Button from '@/app/components/Button';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

import AdminTitle from './AdminTitle';

export default function AvailabilityCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [initialDates, setInitialDates] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch(
          `/api/admin/calendar?month=${currentMonth}&year=${currentYear}`,
        );
        if (!response.ok) throw new Error('Failed to fetch blocked dates');
        const data = await response.json();
        const dates = data.blockedDates || [];
        const now = new Date().toISOString().split('T')[0];
        const futureOrEqualDates = dates.filter(
          (dateString: string) =>
            new Date(dateString).toISOString().split('T')[0] >= now,
        );
        setSelectedDates(futureOrEqualDates);
        setInitialDates(futureOrEqualDates);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Error fetching blocked dates',
        );
      }
    };

    fetchBlockedDates();
  }, [currentMonth, currentYear]);

  const handleSave = async () => {
    if (!selectedDates.length) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/calendar?isExists=true&month=${currentMonth}&year=${currentYear}`,
      );
      const { exists } = await response.json();
      const method = exists ? 'PUT' : 'POST';

      const formattedDates = selectedDates
        .filter((date) => !isNaN(new Date(date).getTime()))
        .map((date) => new Date(date).toISOString())
        .sort();

      await fetch(
        `/api/admin/calendar${exists ? `?month=${currentMonth}&year=${currentYear}` : ''}`,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            year: currentYear,
            month: currentMonth,
            blockedDates: formattedDates,
          }),
        },
      );

      toast.success('Blocked dates saved successfully!', {
        duration: 3000,
      });
      setInitialDates(selectedDates.sort((a, b) => a - b));
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : 'Error saving blocked dates',
      );
    } finally {
      setLoading(false);
    }
  };

  const isNewDate = (date: Date) =>
    !initialDates.some(
      (oldDate) => new Date(oldDate).getTime() === new Date(date).getTime(),
    );

  const arraysAreEqual = (arr1: Date[], arr2: Date[]) => {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = arr1.map((date) => new Date(date).getTime()).sort();
    const sortedArr2 = arr2.map((date) => new Date(date).getTime()).sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  };

  const hasChanges = !arraysAreEqual(selectedDates, initialDates);

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
            onChange={(dates) => setSelectedDates(dates as Date[])}
            onMonthChange={(date: Date) => setCurrentDate(date)}
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
                      isNewDate(date) && 'flex'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('default', {
                      day: '2-digit',
                      month: 'long',
                    })}
                    {isNewDate(date) && (
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
          disabled={loading || !hasChanges}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
