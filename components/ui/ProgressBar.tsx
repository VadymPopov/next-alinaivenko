import React from 'react';
import { GrPrevious } from 'react-icons/gr';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
  prevStep: () => void;
}

export function ProgressBar({ step, totalSteps, prevStep }: ProgressBarProps) {
  const percentage = totalSteps > 0 ? (step / totalSteps) * 100 : 0;

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

      <div
        className="flex items-center gap-2 py-1.5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div className="h-2.5 w-full overflow-hidden rounded-lg bg-bgColor">
          <div
            className="h-full bg-accentColor transition-all duration-300"
            style={{ width: `${percentage}%` }}
            data-testid="progress-bar"
          ></div>
        </div>
        <span className="text-center font-medium text-accentColor">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}
