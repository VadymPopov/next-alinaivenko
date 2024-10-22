import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FcCheckmark } from 'react-icons/fc';

import clsx from 'clsx';

interface DatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  bday: boolean;
}

export default function DatePickerField<T extends FieldValues>({
  name,
  control,
  error,
  label,
  minDate,
  maxDate,
  bday,
}: DatePickerProps<T>) {
  return (
    <div className="flex items-center justify-center">
      <div className="waiver flex flex-col md:w-96 sm:w-80 w-full relative">
        <label className="text-start mb-1 text-base" htmlFor={name as string}>
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => {
            const isValidDate = (date: string | Date) =>
              !isNaN(new Date(date).getTime());
            const selectedDate = isValidDate(value) ? new Date(value) : null;
            return (
              <>
                <DatePicker
                  showIcon
                  id={name as string}
                  selected={selectedDate}
                  onChange={onChange}
                  placeholderText="Select a date"
                  showYearDropdown={bday}
                  scrollableYearDropdown={bday}
                  yearDropdownItemNumber={100}
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormatCalendar={bday ? 'MMMM' : 'MMMM yyyy'}
                  dateFormat="dd/MM/yyyy"
                  className={clsx(
                    error ? 'border-error' : 'border-textColorDarkBg',
                    'flex text-lg md:text-xl rounded-xl border-2 focus:border-accentColor hover:border-accentColor px-4 py-2.5 w-full outline-accentColor font-light ',
                  )}
                />
                {value && !error && (
                  <FcCheckmark
                    className="absolute top-1/2 right-2 translate-y-[-50%] text-xl"
                    aria-label="Valid input"
                  />
                )}
              </>
            );
          }}
        />
        <span className="my-1 text-error text-sm h-5">{error}</span>
      </div>
    </div>
  );
}
