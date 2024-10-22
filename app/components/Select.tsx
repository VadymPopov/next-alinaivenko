import { HTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FcCheckmark } from 'react-icons/fc';
import Select from 'react-select';

// import { FormValues } from './OrderForm';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends HTMLAttributes<HTMLSelectElement> {
  options?: Option[];
  label: string;
  name: keyof FormValues;
  error?: string;
  control?: Control<FormValues>;
}

export default function SelectField({
  options,
  label,
  name,
  error,
  control,
}: SelectFieldProps) {
  return (
    <div className="flex  items-center justify-center">
      <div className="flex flex-col md:w-96 sm:w-80 w-full ">
        <label className="text-start mb-1 text-base" htmlFor={name}>
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <div className="relative">
              <Select
                id={name}
                options={options}
                onChange={(selectedOption) => onChange(selectedOption?.value)}
                onBlur={onBlur}
                value={options.find((option) => option.value === value) || null}
                classNamePrefix="react-select"
                styles={{
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    paddingLeft: 0,
                    paddingRight: 0,
                    transition: 'transform 0.2s ease',
                    transform: state.selectProps.menuIsOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  control: (provided) => ({
                    ...provided,
                    flexDirection: 'row-reverse',
                    cursor: 'pointer',
                    borderColor: error ? '#D2042D' : '#9DA4BD',
                    borderWidth: '2px',
                    borderRadius: '12px',
                    padding: '6px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'rgba(255, 108, 0, 1)',
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                    backgroundColor: '#fff',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? 'rgba(255, 108, 0, 1)'
                      : state.isFocused
                        ? '#f7f7f7'
                        : '#fff',
                    color: state.isSelected ? '#fff' : 'black',
                    padding: '10px',
                    cursor: 'pointer',
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#9DA4BD',
                    fontSize: '1.25rem',
                    fontWeight: 'lighter',
                  }),
                }}
              />
              {value && !error && (
                <span
                  className="absolute top-1/2 right-2 translate-y-[-50%]"
                  aria-label="Valid input"
                >
                  <FcCheckmark className="text-xl" />
                </span>
              )}
            </div>
          )}
        />
        <span className="my-1 text-error text-sm h-5">{error}</span>
      </div>
    </div>
  );
}
