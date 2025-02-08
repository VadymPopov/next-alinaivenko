import { WaiverForm } from '@/components/site';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/providers/WaiverFormContext', () => ({
  WaiverFormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/site/WaiverForm/StepOne', () => ({
  __esModule: true,
  default: ({ nextStep }: { nextStep: () => void }) => (
    <div>
      StepOne
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

jest.mock('@/components/site/WaiverForm/StepTwo', () => ({
  __esModule: true,
  default: ({ nextStep }: { nextStep: () => void }) => (
    <div>
      StepTwo
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

jest.mock('@/components/site/WaiverForm/StepThree', () => ({
  __esModule: true,
  default: ({ nextStep }: { nextStep: () => void }) => (
    <div>
      StepThree
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

jest.mock('@/components/site/WaiverForm/StepFour', () => ({
  __esModule: true,
  default: ({ nextStep }: { nextStep: () => void }) => (
    <div>
      StepFour
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

jest.mock('@/components/site/WaiverForm/StepFive', () => ({
  __esModule: true,
  default: ({ nextStep }: { nextStep: () => void }) => (
    <div>
      StepFive
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

jest.mock('@/components/site/WaiverForm/StepSix', () => ({
  __esModule: true,
  default: ({ nextStep }: { nextStep: () => void }) => (
    <div>
      StepSix
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

jest.mock('@/components/site/WaiverForm/StepSeven', () => ({
  __esModule: true,
  default: ({ nextStep }: { nextStep: () => void }) => (
    <div>
      StepSeven
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

describe('WaiverForm component', () => {
  it('renders the first step correctly', () => {
    render(<WaiverForm />);
    expect(screen.getByText('StepOne')).toBeInTheDocument();
  });

  it('navigates through steps when clicking Next', async () => {
    render(<WaiverForm />);

    expect(screen.getByText('StepOne')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByText('StepTwo')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByText('StepThree')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByText('StepFour')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByText('StepFive')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByText('StepSix')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByText('StepSeven')).toBeInTheDocument();
  });
});
