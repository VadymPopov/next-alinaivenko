import StepThree from '@/components/site/WaiverForm/StepThree';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/providers/WaiverFormContext', () => ({
  useWaiverFormContext: jest.fn(),
}));

const nextStep = jest.fn();

describe('StepThree component', () => {
  let mockUpdateFormData: jest.Mock;

  beforeEach(() => {
    mockUpdateFormData = jest.fn();
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      formData: {
        waveRelease: true,
      },
    });
  });

  it('renders component correctly', () => {
    render(<StepThree nextStep={nextStep} />);

    expect(
      screen.getByText(/in consideration of receiving a tattoo/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/I WAIVE AND RELEASE to the fullest/i),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('submits form and navigates to the next step', async () => {
    render(<StepThree nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      waveRelease: true,
    });

    expect(nextStep).toHaveBeenCalled();
  });

  it('removes validation error after checking the waiver checkbox', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      formData: { waveRelease: false },
    });

    render(<StepThree nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(
      screen.getByText(/wave and release must be accepted/i),
    ).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', {
      name: /i waive and release/i,
    });
    await userEvent.click(checkbox);

    expect(
      screen.queryByText(/wave and release must be accepted/i),
    ).not.toBeInTheDocument();
  });
});
