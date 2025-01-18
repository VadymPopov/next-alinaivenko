'use client';

import Button from '@/components/ui/Button';

import React from 'react';

export interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex justify-center items-start px-6 py-4">
      <h2>{`Oops! Something went wrong. ${error.message}`}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
