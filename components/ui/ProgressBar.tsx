import React from 'react';
import { GrPrevious } from 'react-icons/gr';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
  prevStep: () => void;
}

export function ProgressBar({ step, totalSteps, prevStep }: ProgressBarProps) {
  const percentage = (step / totalSteps) * 100;

  return (
    <div className="py-5 px-8">
      <div className="flex">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="flex justify-center items-center mr-2 disabled:text-textColorDarkBg disabled:cursor-not-allowed"
        >
          <GrPrevious />
        </button>
        <p>
          Step {step} of {totalSteps}
        </p>
      </div>

      <div className="flex items-center gap-2 py-1.5">
        <div className="h-2.5 w-full overflow-hidden rounded-lg bg-bgColor">
          <div
            className="h-full bg-accentColor transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-center font-medium text-accentColor">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}
