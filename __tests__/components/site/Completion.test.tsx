import { Completion } from '@/components/site';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Completion component', () => {
  let mockReplace: jest.Mock;
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });

    mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders correctly for booking type', () => {
    mockSearchParams.set('type', 'booking');
    render(<Completion />);

    // expect(screen.getByRole('button')).toBeInTheDocument();
    expect(
      screen.getByText('Your appointment was successfully booked!'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/You will receive a booking confirmation by email/),
    ).toBeInTheDocument();
  });

  it('renders correctly for booking type', () => {
    mockSearchParams.set('type', 'payment');
    render(<Completion />);

    expect(
      screen.getByText('Your payment was successfully made!'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/You will receive a payment confirmation by email/),
    ).toBeInTheDocument();
  });

  it('calls router.replace("/") when back button is clicked', () => {
    render(<Completion />);

    const btn = screen.getByRole('button', { name: /back/i });
    fireEvent.click(btn);

    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
