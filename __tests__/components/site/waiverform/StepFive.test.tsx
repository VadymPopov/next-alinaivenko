import StepFive from '@/components/site/WaiverForm/StepFive';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/providers/WaiverFormContext', () => ({
  useWaiverFormContext: jest.fn(),
}));

const nextStep = jest.fn();

describe('StepFive component', () => {
  let mockUpdateFormData: jest.Mock;

  beforeEach(() => {
    mockUpdateFormData = jest.fn();
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      formData: {
        refund: true,
        permanentChange: true,
        media: true,
        age: true,
      },
    });
  });

  it('renders component correctly', () => {
    render(<StepFive nextStep={nextStep} />);

    expect(
      screen.getByText(
        /I acknowledge and accept the Tattoo Artist's NO REFUND policy for tattoos/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /I understand that a tattoo is a permanent change/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/I willingly grant consent/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /I confirm that I am either at least 18 years old or have a legal guardian present/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('submits form when all checkboxes are checked and navigates to next step', async () => {
    render(<StepFive nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      refund: true,
      permanentChange: true,
      media: true,
      age: true,
    });

    expect(nextStep).toHaveBeenCalled();
  });

  it('removes validation errors after checking all checkboxes', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      formData: {
        refund: false,
        permanentChange: false,
        media: false,
        age: false,
      },
    });

    render(<StepFive nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(
      screen.getByText(/refund policy must be accepted/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/permanent change must be acknowledged/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/media usage must be accepted/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/age verification must be accepted/i),
    ).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox);
    }

    expect(
      screen.queryByText(/refund policy must be accepted/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/permanent change must be acknowledged/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/media usage must be accepted/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/age verification must be accepted/i),
    ).not.toBeInTheDocument();
  });
});
