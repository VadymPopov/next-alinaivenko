import StepOne from '@/components/site/WaiverForm/StepOne';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/providers/WaiverFormContext', () => ({
  useWaiverFormContext: jest.fn(),
}));

const nextStep = jest.fn();

describe('StepOne component', () => {
  let mockSetIsClientUnder18: jest.Mock;
  let mockUpdateFormData: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetIsClientUnder18 = jest.fn();
    mockUpdateFormData = jest.fn();
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      setIsClientUnder18: mockSetIsClientUnder18,
      formData: {
        name: 'Test',
        email: 'test@gmail.com',
        phone: '123456789',
        governmentId: 'AAA-2025-test-id',
        dob: '01-01-1970',
        address: '123 Test street',
      },
    });
  });

  it('renders component correctly', () => {
    render(<StepOne nextStep={nextStep} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birthday date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enter government-issued id number/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('pre-fills form fields with context values', () => {
    render(<StepOne nextStep={nextStep} />);

    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456789')).toBeInTheDocument();
    expect(screen.getByDisplayValue('AAA-2025-test-id')).toBeInTheDocument();
    expect(screen.getByLabelText(/birthday date/i)).toHaveValue('01/01/1970');

    expect(screen.getByDisplayValue('123 Test street')).toBeInTheDocument();
  });

  it('submits form and navigates to the next step', async () => {
    render(<StepOne nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      name: 'Test',
      email: 'test@gmail.com',
      phone: '123456789',
      governmentId: 'AAA-2025-test-id',
      dob: '01-01-1970',
      address: '123 Test street',
    });
    expect(mockSetIsClientUnder18).toHaveBeenCalled();

    expect(nextStep).toHaveBeenCalled();
  });

  it('displays validation errors for empty fields', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      formData: {
        name: '',
        email: '',
        governmentId: '',
        dob: '',
        address: '',
      },
    });
    render(<StepOne nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/birthday date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/government id is required/i)).toBeInTheDocument();
  });

  it('disables submit button if form has validation errors', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      formData: {
        name: '',
        email: '',
        governmentId: '',
        dob: '',
        address: '',
      },
    });
    render(<StepOne nextStep={nextStep} />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/birthday date/i), '01-01-1990');
    await userEvent.type(screen.getByLabelText(/phone number/i), '123456789');
    await userEvent.type(screen.getByLabelText(/address/i), '456 Main St');
    await userEvent.type(
      screen.getByLabelText(/enter government-issued id number/i),
      'XYZ-2025-id',
    );

    expect(btn).toBeEnabled();
  });

  it('submits form with updated values', async () => {
    render(<StepOne nextStep={nextStep} />);

    await userEvent.clear(screen.getByLabelText(/name/i));
    await userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');

    await userEvent.clear(screen.getByLabelText(/email/i));
    await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');

    await userEvent.clear(screen.getByLabelText(/birthday date/i));
    await userEvent.type(screen.getByLabelText(/birthday date/i), '03-03-2000');

    await userEvent.clear(screen.getByLabelText(/phone number/i));
    await userEvent.type(screen.getByLabelText(/phone number/i), '987654321');

    await userEvent.clear(screen.getByLabelText(/address/i));
    await userEvent.type(screen.getByLabelText(/address/i), '789 Test Ave');

    await userEvent.clear(screen.getByLabelText(/government-issued id/i));
    await userEvent.type(
      screen.getByLabelText(/government-issued id/i),
      'BBB-2025-test-id',
    );

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987654321',
      governmentId: 'BBB-2025-test-id',
      dob: 'Fri Mar 03 2000 19:00:00 GMT-0500 (Eastern Standard Time)',
      address: '789 Test Ave',
    });
  });
});
