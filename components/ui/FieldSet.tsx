import React, { ReactNode } from 'react';

export interface FieldSetProps {
  children: ReactNode;
  title: string;
}

export function FieldSet({ title, children }: FieldSetProps) {
  return (
    <fieldset className="rounded-3xl border-2 border-textColorDarkBg my-5 mx-0 p-4">
      <legend className="font-raleway font-semibold md:text-2xl tracking-wider text-mainDarkColor text-start text-lg">
        {title}
      </legend>
      <>{children}</>
    </fieldset>
  );
}
