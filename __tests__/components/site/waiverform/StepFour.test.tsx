import StepFour from '@/components/site/WaiverForm/StepFour';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/providers/WaiverFormContext', () => ({
  useWaiverFormContext: jest.fn(),
}));

const nextStep = jest.fn();

describe('StepFour component', () => {
  let mockUpdateFormData: jest.Mock;

  beforeEach(() => {
    mockUpdateFormData = jest.fn();
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      formData: {
        pain: true,
        infection: true,
        healing: true,
        outcome: true,
      },
    });
  });

  it('renders component correctly', () => {
    render(<StepFour nextStep={nextStep} />);

    expect(
      screen.getByText(
        /I have been fully informed of the inherent risks associated with getting a tattoo/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /pain and discomfort/i,
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/tattooing process may involve pain/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /infection and allergic reactions/i,
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/risk of infection/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /healing process/i,
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/healing process varies among individuals/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /tattoo outcome/i,
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /I am fully responsible for verifying these details prior to getting the tattoo/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('submits form when all checkboxes are checked and navigates to next step', async () => {
    render(<StepFour nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      pain: true,
      infection: true,
      healing: true,
      outcome: true,
    });

    expect(nextStep).toHaveBeenCalled();
  });

  it('removes validation errors after checking all checkboxes', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      formData: {
        pain: false,
        infection: false,
        healing: false,
        outcome: false,
      },
    });

    render(<StepFour nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(screen.getByText(/pain must be acknowledged/i)).toBeInTheDocument();
    expect(
      screen.getByText(/infection must be acknowledged/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/healing must be acknowledged/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/outcome must be acknowledged/i),
    ).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox);
    }

    expect(
      screen.queryByText(/pain must be acknowledged/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/infection must be acknowledged/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/healing must be acknowledged/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/outcome must be acknowledged/i),
    ).not.toBeInTheDocument();
  });
});
