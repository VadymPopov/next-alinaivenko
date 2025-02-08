import { PaymentForm } from '@/components/site';
import { useAppContext } from '@/providers/AppContext';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/AppContext', () => ({
  useAppContext: jest.fn(),
}));

describe('PaymentForm component', () => {
  let mockPush: jest.Mock;
  let mockSetPaymentInfo: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockSetPaymentInfo = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppContext as jest.Mock).mockReturnValue({
      setPaymentInfo: mockSetPaymentInfo,
      paymentInfo: {
        amount: 100,
        name: 'Test',
        email: 'test@gmail.com',
      },
    });
  });

  it('renders component correctly', () => {
    render(<PaymentForm />);

    expect(screen.getByText(/fill out your information/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('pre-fills form fields with context values', () => {
    render(<PaymentForm />);

    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  it('submits form and navigates to the next step', async () => {
    render(<PaymentForm />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(mockPush).toHaveBeenCalledWith('/payment/tip-amount');
    expect(mockSetPaymentInfo).toHaveBeenCalledWith({
      amount: 100,
      name: 'Test',
      email: 'test@gmail.com',
    });
  });

  it('displays validation errors for empty fields', async () => {
    (useAppContext as jest.Mock).mockReturnValue({
      setPaymentInfo: mockSetPaymentInfo,
      paymentInfo: {
        amount: null,
        name: '',
        email: '',
      },
    });
    render(<PaymentForm />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/amount is required/i)).toBeInTheDocument();
  });

  it('disables submit button if form has validation errors', async () => {
    (useAppContext as jest.Mock).mockReturnValue({
      setPaymentInfo: mockSetPaymentInfo,
      paymentInfo: {
        amount: null,
        name: '',
        email: '',
      },
    });
    render(<PaymentForm />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/amount/i), '50');

    expect(btn).toBeEnabled();
  });
});
