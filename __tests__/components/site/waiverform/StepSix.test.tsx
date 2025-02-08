import StepSix from '@/components/site/WaiverForm/StepSix';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/providers/WaiverFormContext', () => ({
  useWaiverFormContext: jest.fn(),
}));

const nextStep = jest.fn();

describe('StepSix component', () => {
  let mockUpdateFormData: jest.Mock;

  beforeEach(() => {
    mockUpdateFormData = jest.fn();
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      formData: {
        drugs: false,
        disease: false,
        medication: false,
        skin: false,
        recipientOrgan: false,
        pregnancy: false,
      },
    });
  });

  it('renders correctly', () => {
    render(<StepSix nextStep={nextStep} />);

    expect(
      screen.getByLabelText(
        /I confirm that I am not under the influence of alcohol or drugs/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /I confirm that I do not have diabetes, epilepsy, hemophilia/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /I confirm that I am not currently taking any blood thinning medication/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /I confirm that I do not have any other medical or skin conditions/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /I confirm that I am not a recipient of an organ or bone marrow transplant/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /If applicable, I confirm that I am not currently pregnant or nursing/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('pre-fills form values from context', () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      formData: {
        drugs: true,
        disease: true,
        medication: false,
        skin: true,
        recipientOrgan: false,
        pregnancy: true,
      },
    });

    render(<StepSix nextStep={nextStep} />);

    expect(
      screen.getByLabelText(/I confirm that I am not under the influence/i),
    ).toBeChecked();
    expect(
      screen.getByLabelText(/I confirm that I do not have diabetes/i),
    ).toBeChecked();
    expect(
      screen.getByLabelText(
        /I confirm that I am not currently taking any blood thinning medication/i,
      ),
    ).not.toBeChecked();
    expect(
      screen.getByLabelText(/I confirm that I do not have any other medical/i),
    ).toBeChecked();
    expect(
      screen.getByLabelText(/I confirm that I am not a recipient/i),
    ).not.toBeChecked();
    expect(
      screen.getByLabelText(
        /If applicable, I confirm that I am not currently pregnant/i,
      ),
    ).toBeChecked();
  });

  it('displays validation errors when submitted without checking all boxes', async () => {
    render(<StepSix nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(
      screen.getByText(/drugs condition must be accepted/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/disease condition must be accepted/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/medication condition must be accepted/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/skin condition must be accepted/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/recipient organ condition must be accepted/i),
    ).toBeInTheDocument();
  });

  it('removes validation errors after checking all checkboxes', async () => {
    render(<StepSix nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(
      screen.getByText(/drugs condition must be accepted/i),
    ).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox);
    }

    expect(
      screen.queryByText(/drugs condition must be accepted/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/disease condition must be accepted/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/medication must be accepted/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/skin condition must be accepted/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/recipient organ must be accepted/i),
    ).not.toBeInTheDocument();
  });

  it('submits form when all checkboxes are checked and navigates to the next step', async () => {
    render(<StepSix nextStep={nextStep} />);

    const checkboxes = screen.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox);
    }

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      drugs: true,
      disease: true,
      medication: true,
      skin: true,
      recipientOrgan: true,
      pregnancy: true,
    });

    expect(nextStep).toHaveBeenCalled();
  });

  it('persists checkbox state across re-renders', async () => {
    const { rerender } = render(<StepSix nextStep={nextStep} />);

    const checkboxDrugs = screen.getByLabelText(
      /I confirm that I am not under the influence/i,
    );
    await userEvent.click(checkboxDrugs);

    expect(checkboxDrugs).toBeChecked();

    rerender(<StepSix nextStep={nextStep} />);

    expect(checkboxDrugs).toBeChecked();
  });
});
