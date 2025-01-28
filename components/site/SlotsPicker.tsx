'use client';

import { ScheduleFormValues } from '@/types';
import { isTimeWithinLastHour } from '@/utils';

import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import clsx from 'clsx';

interface SlotsPickerProps {
  name: keyof ScheduleFormValues;
  control: Control<ScheduleFormValues>;
  error?: string;
  slots: string[];
  selectedDate: Date;
}

export function SlotsPicker({
  name,
  control,
  error,
  slots,
  selectedDate,
}: SlotsPickerProps) {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );

  const handleBtnClick = (
    slot: string,
    index: number | null,
    onChange: (_value: string | null) => void,
  ) => {
    if (activeButtonIndex === index) {
      setActiveButtonIndex(null);
      onChange(null);
    } else {
      setActiveButtonIndex(index);
      onChange(slot);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {slots && slots.length > 0 ? (
        <div>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center justify-center sm:block">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mx-auto my-5 sm:w-auto sm:grid-cols-3">
                  {slots.map((slot, idx) => (
                    <button
                      type="button"
                      key={idx}
                      disabled={isTimeWithinLastHour(selectedDate, slot)}
                      onClick={() => handleBtnClick(slot, idx, onChange)}
                      className={clsx(
                        value === slot ? 'bg-accentColor' : 'bg-cardColor',
                        'py-3 px-6 font-semibold text-xs border border-accentColor rounded-2xl transition-colors cursor-pointer text-mainLightColor hover:bg-accentColor hover:shadow-lg disabled:bg-bgColor disabled:shadow-none disabled:cursor-not-allowed disabled:text-textColorDarkBg w-[90px] duration-300',
                      )}
                      aria-pressed={value === slot}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          />
          <span className="my-1 text-error text-sm h-5" role="alert">
            {error}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col mt-4 mb-5 w-[400px] h-[260px]">
          <p className="text-lg font-semibold tracking-wider">
            Sorry, there are no available times.
          </p>
          <p className="text-lg font-semibold tracking-wider">
            Please check another date.
          </p>
        </div>
      )}
    </div>
  );
}
