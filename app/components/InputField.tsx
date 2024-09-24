import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

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
  ...props
}: InputFieldProps) {
  const methods = useFormContext();
  const registeredProps = methods.register(name);

  return (
    <div className="flex  items-center justify-center">
      <div className="flex flex-col md:w-96 sm:w-80 w-full ">
        <label className="text-start mb-1 text-base" htmlFor={name}>
          {label}{' '}
          {optional && <span className="text-textColorDarkBg">(Optional)</span>}
        </label>
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
              'text-lg md:text-xl rounded-xl border-2 border-textColorDarkBg focus:border-accentColor hover:border-accentColor px-4 py-2.5  resize-none w-full h-[200px]',
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
              error ? 'border-error' : 'border-textColorDarkBg',
              'flex text-lg md:text-xl rounded-xl border-2  focus:border-accentColor hover:border-accentColor px-4 py-2.5 w-full ',

              type === 'checkbox' && 'w-5 h-5 mr-5',
            )}
          />
        )}
        <span className="my-1 text-error text-sm h-5">{error}</span>
      </div>
    </div>
  );
}
