import { CheckoutStripeForm } from '@/components/site';
import { useConfirmPayment } from '@/hooks';

import { useElements, useStripe } from '@stripe/react-stripe-js';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useConfirmPayment: jest.fn(),
}));

jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: jest.fn(),
  useElements: jest.fn(),
  PaymentElement: jest.fn(() => <div data-testid="payment-element" />),
}));

const paymentMockedBody = {
  tip: 10,
  amount: 100,
  tax: 15,
  fee: 6,
  total: 131,
};

const bookingMockedBody = {
  date: new Date('2025-02-15'),
  slot: '11:30am',
  amount: 100,
  tax: 15,
  fee: 3,
  total: 118,
};

describe('CheckoutStripeForm component', () => {
  let mockReplace: jest.Mock;
  let mockConfirmPayment: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReplace = jest.fn();
    mockConfirmPayment = jest.fn().mockReturnValue({ success: true });

    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (useConfirmPayment as jest.Mock).mockReturnValue({
      isProcessing: false,
      message: '',
      confirmPayment: mockConfirmPayment,
    });

    (useStripe as jest.Mock).mockReturnValue({
      confirmPayment: jest.fn(() =>
        Promise.resolve({
          paymentIntent: { status: 'succeeded' },
          error: null,
        }),
      ),
    });

    (useElements as jest.Mock).mockReturnValue({
      getElement: jest.fn(),
    });
  });

  it('renders component correctly as payment checkout', () => {
    render(<CheckoutStripeForm isBooking={false} body={paymentMockedBody} />);

    expect(screen.getByText(/your order/i)).toBeInTheDocument();
    expect(screen.getByText(/tattoo service payment/i)).toBeInTheDocument();
    expect(screen.getByText('CA$100.00')).toBeInTheDocument();
    expect(screen.getByText('CA$15.00')).toBeInTheDocument();
    expect(screen.getByText('CA$6.00')).toBeInTheDocument();
    expect(screen.getByText('CA$131.00')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /pay now/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('payment-element')).toBeInTheDocument();
  });

  it('renders component correctly as booking checkout', () => {
    render(
      <CheckoutStripeForm
        isBooking={true}
        body={bookingMockedBody}
        service={'Large Tattoo'}
      />,
    );

    expect(screen.getByText(/service details/i)).toBeInTheDocument();
    expect(
      screen.getByText(/large tattoo appointment deposit/i),
    ).toBeInTheDocument();
    expect(screen.getByText('CA$100.00')).toBeInTheDocument();
    expect(screen.getByText('CA$15.00')).toBeInTheDocument();
    expect(screen.getByText('CA$3.00')).toBeInTheDocument();
    expect(screen.getByText('CA$118.00')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /pay now/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('payment-element')).toBeInTheDocument();
  });

  it('disables button if isProcessing is true', () => {
    (useConfirmPayment as jest.Mock).mockReturnValue({
      isProcessing: true,
      message: '',
      confirmPayment: mockConfirmPayment,
    });

    render(
      <CheckoutStripeForm
        isBooking={true}
        body={bookingMockedBody}
        service="Large Tattoo"
      />,
    );
    const btn = screen.getByRole('button', { name: /processing/i });

    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('disables button if stripe or elements are unavailable', () => {
    (useStripe as jest.Mock).mockReturnValue(null);
    (useElements as jest.Mock).mockReturnValue(null);

    render(
      <CheckoutStripeForm
        isBooking={true}
        body={bookingMockedBody}
        service="Large Tattoo"
      />,
    );

    const btn = screen.getByRole('button', { name: /pay now/i });
    expect(btn).toBeDisabled();
  });

  it('shows error message if payment fails', () => {
    (useConfirmPayment as jest.Mock).mockReturnValue({
      isProcessing: false,
      message: 'Test error occurred',
      confirmPayment: mockConfirmPayment,
    });

    render(
      <CheckoutStripeForm
        isBooking={true}
        body={bookingMockedBody}
        service="Large Tattoo"
      />,
    );

    expect(screen.getByText('Test error occurred')).toBeInTheDocument();
  });

  it('submits form and navigates on success', async () => {
    render(
      <CheckoutStripeForm
        isBooking={true}
        body={bookingMockedBody}
        service={'Large Tattoo'}
      />,
    );
    const btn = screen.getByRole('button', { name: /pay now/i });
    expect(btn).toBeEnabled();
    fireEvent.click(btn);

    expect(mockConfirmPayment).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
      {
        isBooking: true,
        body: bookingMockedBody,
        service: 'Large Tattoo',
      },
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        '/payment-succeeded?type=booking',
      );
    });
  });

  it('does not navigate if payment fails', async () => {
    mockConfirmPayment.mockResolvedValue({ success: false });

    render(
      <CheckoutStripeForm
        isBooking={true}
        body={bookingMockedBody}
        service="Large Tattoo"
      />,
    );
    const btn = screen.getByRole('button', { name: /pay now/i });

    fireEvent.click(btn);

    await waitFor(() => {
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  it('navigates correctly when isBooking is false', async () => {
    render(<CheckoutStripeForm isBooking={false} body={paymentMockedBody} />);
    const btn = screen.getByRole('button', { name: /pay now/i });

    fireEvent.click(btn);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/payment-succeeded');
    });
  });
});
