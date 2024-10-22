import React, { useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import SignatureCanvas from 'react-signature-canvas';

import clsx from 'clsx';

interface SignatureFieldProps<T extends FieldValues> {
  name: Path<T>;
  error?: string;
  control: Control<T>;
}

export default function SignatureField<T extends FieldValues>({
  name,
  error,
  control,
}: SignatureFieldProps<T>) {
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const signatureRef = useRef<SignatureCanvas | null>(null);

  const handleCanvasChange = (onChange: (_event: unknown) => void) => {
    if (signatureRef.current && signatureRef.current.isEmpty()) {
      setIsSignatureEmpty(true);
      onChange('');
    } else if (signatureRef.current) {
      setIsSignatureEmpty(false);
      const signatureDataUrl = signatureRef.current.toDataURL();
      onChange(signatureDataUrl);
    }
  };

  const clearSignature = (onChange: (_event: unknown) => void) => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setIsSignatureEmpty(true);
      onChange('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div
            className="relative mb-2.5"
            onClick={() => setIsSignatureEmpty(false)}
          >
            {!isSignatureEmpty ? (
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => clearSignature(onChange)}
                aria-label="Clear signature"
              >
                <div className=" bg-mainDarkColor hover:bg-cardColor transition-colors rounded-full">
                  <MdClose className="text-lg text-mainLightColor" />
                </div>
              </button>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-sm text-textColorDarkBg">
                Click here to start signing
              </div>
            )}
            <SignatureCanvas
              ref={signatureRef}
              onEnd={() => handleCanvasChange(onChange)}
              canvasProps={{
                width: 500,
                height: 200,
                style: {
                  border: clsx('2px solid ', error ? '#d2042d' : '#9DA4BD'),
                  borderRadius: '5px',
                },
              }}
            />
          </div>
        )}
      />
      <span className="my-1 text-error text-sm h-5">{error}</span>
    </div>
  );
}
