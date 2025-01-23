import { ProgressBar } from '@/components/ui';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('ProgressBar component', () => {
  it('renders ProgressBar component correctly', () => {
    render(<ProgressBar step={2} prevStep={() => {}} totalSteps={5} />);

    expect(screen.getByRole('button')).toBeEnabled();
    expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 40%');
  });

  it('disables previous button on first step', () => {
    render(<ProgressBar step={1} totalSteps={5} prevStep={() => {}} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls prevStep on btn click', () => {
    const mockPrevStep = jest.fn();
    render(<ProgressBar step={2} prevStep={mockPrevStep} totalSteps={5} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockPrevStep).toHaveBeenCalledTimes(1);
  });

  it('renders correctly on the last step', () => {
    render(<ProgressBar step={5} totalSteps={5} prevStep={() => {}} />);

    expect(screen.getByText('Step 5 of 5')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 100%');
  });

  it('has correct accessibility attributes', () => {
    render(<ProgressBar step={3} totalSteps={5} prevStep={() => {}} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-valuenow', '60');
  });

  it('updates progress bar when step or totalSteps change', () => {
    const { rerender } = render(
      <ProgressBar step={1} totalSteps={5} prevStep={() => {}} />,
    );

    expect(screen.getByText('20%')).toBeInTheDocument();

    rerender(<ProgressBar step={3} totalSteps={5} prevStep={() => {}} />);
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 60%');
  });
});
