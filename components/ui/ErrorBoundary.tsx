'use client';

import { Button } from '@/components/ui';

import React from 'react';

export interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center px-6 py-4 min-h-screen">
      <h2 className="font-semibold sm:text-lg text-center">{`Oops! Something went wrong. ${error.message}`}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
