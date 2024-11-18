import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { FcCheckmark } from 'react-icons/fc';

import clsx from 'clsx';

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  title?: string;
  placeholder?: string;
  label: string;
  type?: string;
  name: string;
  optional?: boolean;
  error?: string;
  textarea?: boolean;
  admin?: boolean;
  styles?: string;
}

export default function InputField({
  title,
  placeholder,
  label,
  type,
  name,
  optional,
  error,
  textarea,
  admin,
  styles,
  ...props
}: InputFieldProps) {
  const { register, watch } = useFormContext();
  const registeredProps = register(name);
  const value = watch(name);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={clsx(
          !admin ? 'flex  w-full' : 'flex',
          type === 'checkbox'
            ? 'flex-row-reverse text-justify max-w-2xl'
            : !admin
              ? 'flex-col md:w-96 sm:w-80'
              : 'flex-col',
        )}
      >
        <label className="text-start mb-1 text-base" htmlFor={name}>
          {label}{' '}
          {optional && <span className="text-textColorDarkBg">(Optional)</span>}
        </label>
        <div className="relative">
          {textarea ? (
            <textarea
              rows={4}
              cols={20}
              title={title}
              placeholder={placeholder}
              id={name}
              {...props}
              {...registeredProps}
              className={clsx(
                'text-lg md:text-xl rounded-xl border-2 border-textColorDarkBg focus:border-accentColor hover:border-accentColor px-4 py-2.5  resize-none w-full h-[200px] placeholder:font-thin',
              )}
            />
          ) : (
            <input
              autoComplete="true"
              title={title}
              placeholder={placeholder}
              id={name}
              type={type}
              {...props}
              {...registeredProps}
              className={clsx(
                styles ? styles : 'pl-4 pr-7 py-2.5 w-full',
                error ? 'border-error' : 'border-textColorDarkBg',
                'flex text-lg md:text-xl rounded-xl border-2  focus:border-accentColor hover:border-accentColor  placeholder:font-thin',

                type === 'checkbox' && 'w-5 h-5 mr-5',
              )}
            />
          )}
          {value && !error && type !== 'checkbox' && !admin && (
            <span
              className="absolute top-1/2 right-2 translate-y-[-50%]"
              aria-label="Valid input"
            >
              <FcCheckmark className="text-xl" />
            </span>
          )}
        </div>
      </div>
      <span className={clsx(!admin ? 'my-1 text-error text-sm h-5' : '')}>
        {error}
      </span>
    </div>
  );
}
