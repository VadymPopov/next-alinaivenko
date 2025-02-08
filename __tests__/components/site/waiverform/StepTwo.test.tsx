import StepTwo from '@/components/site/WaiverForm/StepTwo';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';

jest.mock('@/providers/WaiverFormContext', () => ({
  useWaiverFormContext: jest.fn(),
}));

const nextStep = jest.fn();

describe('StepTwo component', () => {
  let mockUpdateFormData: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateFormData = jest.fn();
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      formData: {
        service: 'Tattoo',
        bodyPart: 'right hand',
        design: 'red dragon',
        appointmentDate: '01/15/2025',
      },
    });
  });

  it('renders component correctly', () => {
    render(<StepTwo nextStep={nextStep} />);

    expect(
      screen.getByText(/What service are you receiving?/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        /The tattoo will be placed on the following body part/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/The design is described as follows/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Appointment Date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('pre-fills form fields with context values', () => {
    render(<StepTwo nextStep={nextStep} />);

    expect(screen.getByText('Tattoo')).toBeInTheDocument();
    expect(screen.getByDisplayValue('right hand')).toBeInTheDocument();
    expect(screen.getByDisplayValue('red dragon')).toBeInTheDocument();
    expect(screen.getByLabelText(/appointment date/i)).toHaveValue(
      '15/01/2025',
    );
  });

  it('submits form and navigates to the next step', async () => {
    render(<StepTwo nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      service: 'Tattoo',
      bodyPart: 'right hand',
      design: 'red dragon',
      appointmentDate: '01/15/2025',
    });

    expect(nextStep).toHaveBeenCalled();
  });

  it('displays validation errors for empty fields', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      formData: {
        service: '',
        bodyPart: '',
        design: '',
        appointmentDate: '',
      },
    });
    render(<StepTwo nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(screen.getByText(/body part is required/i)).toBeInTheDocument();
    expect(screen.getByText(/design is required/i)).toBeInTheDocument();
  });

  it('submits form with updated values', async () => {
    render(<StepTwo nextStep={nextStep} />);

    await userEvent.clear(screen.getByLabelText(/following body part/i));
    await userEvent.type(
      screen.getByLabelText(/following body part/i),
      'Left shoulder',
    );

    await userEvent.clear(screen.getByLabelText(/the design/i));
    await userEvent.type(screen.getByLabelText(/the design/i), 'flowers');

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      service: 'Tattoo',
      bodyPart: 'Left shoulder',
      design: 'flowers',
      appointmentDate: '01/15/2025',
    });
  });

  it('uses default values when formData is not provided', () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: jest.fn(),
      formData: {},
    });

    render(<StepTwo nextStep={nextStep} />);

    expect(screen.getByText('Tattoo')).toBeInTheDocument();
    expect(screen.getByLabelText(/appointment date/i)).toHaveValue(
      format(new Date(), 'dd/MM/yyyy'),
    );
  });
});
