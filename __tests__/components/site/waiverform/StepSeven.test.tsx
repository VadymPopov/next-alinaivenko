import StepSeven from '@/components/site/WaiverForm/StepSeven';
import { useWaiverFormSubmission } from '@/hooks';
import { useWaiverFormContext } from '@/providers/WaiverFormContext';

import toast from 'react-hot-toast';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock('@/providers/WaiverFormContext', () => ({
  useWaiverFormContext: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useWaiverFormSubmission: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/ui/SignatureField', () => ({
  SignatureField: () => <div>Signature Field mocked</div>,
}));

describe('StepSeven component', () => {
  let mockUpdateFormData: jest.Mock;
  let mockSubmitForm: jest.Mock;
  let mockReplace: jest.Mock;

  beforeEach(() => {
    mockUpdateFormData = jest.fn();
    mockSubmitForm = jest.fn().mockReturnValue({ success: true });
    mockReplace = jest.fn();

    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      isClientUnder18: false,
    });

    (useWaiverFormSubmission as jest.Mock).mockReturnValue({
      submitForm: mockSubmitForm,
      isProcessing: false,
    });

    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  it('renders correctly when isClientUnder18 is false', () => {
    render(<StepSeven />);

    expect(screen.getByLabelText(/Lot\/ID number/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/confirm that I have read and understood/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/client signature/i)).toBeInTheDocument();

    expect(screen.getByText(/signature field mocked/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders correctly when isClientUnder18 is true', () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      isClientUnder18: true,
    });
    render(<StepSeven />);

    expect(screen.getByLabelText(/Lot\/ID number/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /confirm that I have read and understood the entire content of this form/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(/for clients under 18/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Guardian Consent/i,
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/as the parent or legal guardian/i),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/enter government-issued id number/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/parental\/guardian signature/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/signature field mocked/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('does not render guardian fields when isClientUnder18 is false', () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      isClientUnder18: false,
    });

    render(<StepSeven />);

    expect(screen.queryByText(/for clients under 18/i)).not.toBeInTheDocument();
  });

  it('displays validation errors when submitted without providing info', async () => {
    render(<StepSeven />);

    const btn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(btn);

    expect(screen.getByText(/lot number is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/acknowledgement of agreement must be accepted/i),
    ).toBeInTheDocument();
  });

  it('displays validation errors when submitted without providing info when isClientUnder18 is true', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      isClientUnder18: true,
    });

    render(<StepSeven />);

    const btn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(btn);

    expect(screen.getByText(/lot number is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/acknowledgement of agreement must be accepted/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/parental\/guardian consent is required for minors/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/parental\/guardian name is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/parental\/guardian government id is required/i),
    ).toBeInTheDocument();
  });

  it('removes validation errors when valid input is provided', async () => {
    render(<StepSeven />);

    const btn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(btn);

    expect(screen.getByText(/lot number is required/i)).toBeInTheDocument();

    const lotInput = screen.getByLabelText(/Lot\/ID number/i);
    await userEvent.type(lotInput, '123456-LOT');

    expect(
      screen.queryByText(/lot number is required/i),
    ).not.toBeInTheDocument();
  });

  it('submits form and navigates to the next step', async () => {
    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      isClientUnder18: false,
      formData: {
        clientSignature: 'signature-base-64',
        agreement: true,
      },
    });

    render(<StepSeven />);

    await userEvent.type(
      screen.getByLabelText(/Lot\/ID number/i),
      '123456-LOT',
    );

    const btn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(btn);

    expect(mockUpdateFormData).toHaveBeenCalled();
    expect(mockSubmitForm).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/faq');
  });

  it('displays an error toast when submission fails', async () => {
    mockSubmitForm.mockReturnValueOnce({
      success: false,
      error: new Error('Server error'),
    });

    (useWaiverFormContext as jest.Mock).mockReturnValue({
      updateFormData: mockUpdateFormData,
      isClientUnder18: false,
      formData: {
        clientSignature: 'signature-base-64',
        agreement: true,
        lot: '123456-LOT',
      },
    });

    render(<StepSeven />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmitForm).toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('Server error');
  });
});
