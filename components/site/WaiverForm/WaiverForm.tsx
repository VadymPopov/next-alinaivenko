'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import Section from '@/components/ui/Section';
import { WaiverFormProvider } from '@/providers/WaiverFormContext';

import React, { useState } from 'react';

import StepFive from './StepFive';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepSeven from './StepSeven';
import StepSix from './StepSix';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

export default function WaiverForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <WaiverFormProvider>
      <div className="fixed bottom-0 z-[120] w-full bg-mainLightColor">
        <ProgressBar step={currentStep} totalSteps={7} prevStep={prevStep} />
      </div>

      <Section>
        {currentStep === 1 && <StepOne nextStep={nextStep} />}
        {currentStep === 2 && <StepTwo nextStep={nextStep} />}
        {currentStep === 3 && <StepThree nextStep={nextStep} />}
        {currentStep === 4 && <StepFour nextStep={nextStep} />}
        {currentStep === 5 && <StepFive nextStep={nextStep} />}
        {currentStep === 6 && <StepSix nextStep={nextStep} />}
        {currentStep === 7 && <StepSeven />}
      </Section>
    </WaiverFormProvider>
  );
}
