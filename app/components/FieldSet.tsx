import React, { ReactNode } from 'react';

export interface IFieldSetProps {
  children: ReactNode;
  title: string;
}

export default function FieldSet({ title, children }: IFieldSetProps) {
  return (
    <fieldset className="rounded-3xl border-2 border-textColorDarkBg my-5 mx-0 p-4">
      <legend className="font-raleway font-semibold md:text-2xl tracking-wider text-mainDarkColor text-start text-lg">
        {title}
      </legend>
      <>{children}</>
    </fieldset>
  );
}
