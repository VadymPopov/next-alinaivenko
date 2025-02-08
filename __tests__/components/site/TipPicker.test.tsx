import { TipPicker } from '@/components/site';
import { TIPS_ARRAY } from '@/constants';
import { useAppContext } from '@/providers/AppContext';
import {
  calculateTip,
  formatCurrency,
  getPaymentBreakdown,
} from '@/utils/helpers';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/AppContext', () => ({
  useAppContext: jest.fn(),
}));

describe('TipPicker component', () => {
  let mockSetPaymentInfo: jest.Mock;
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockSetPaymentInfo = jest.fn();
    mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useAppContext as jest.Mock).mockReturnValue({
      setPaymentInfo: mockSetPaymentInfo,
      paymentInfo: { amount: 100 },
    });
  });

  it('redirects to /payment if amount is missing', () => {
    (useAppContext as jest.Mock).mockReturnValue({
      setPaymentInfo: mockSetPaymentInfo,
      paymentInfo: { amount: 0 },
    });

    render(<TipPicker />);
    expect(mockPush).toHaveBeenCalledWith('/payment');
  });

  it('renders component correctly', () => {
    render(<TipPicker />);

    expect(
      screen.getByRole('heading', { name: /select the tip amount/i, level: 3 }),
    ).toBeInTheDocument();

    TIPS_ARRAY.forEach((tipPercentage) => {
      expect(screen.getByText(`${tipPercentage}%`)).toBeInTheDocument();
    });
    expect(screen.getByText(/custom/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();

    const tip = calculateTip(100, 0);
    const { total, tax, fee } = getPaymentBreakdown(100, 0);

    expect(screen.getByText(`${formatCurrency(tax)}`)).toBeInTheDocument();
    expect(screen.getByText(`${formatCurrency(fee)}`)).toBeInTheDocument();
    expect(screen.getByText(`${formatCurrency(tip)}`)).toBeInTheDocument();
    expect(screen.getByText(`${formatCurrency(total)}`)).toBeInTheDocument();
  });

  it('displays the correct tip amount when selected', () => {
    render(<TipPicker />);

    const tipCard = screen.getAllByRole('tip-card')[1];
    fireEvent.click(tipCard);

    const tip = calculateTip(100, TIPS_ARRAY[1]);
    const { total, tax, fee } = getPaymentBreakdown(100, TIPS_ARRAY[1]);

    expect(screen.getByText(`${formatCurrency(tax)}`)).toBeInTheDocument();
    expect(screen.getByText(`${formatCurrency(fee)}`)).toBeInTheDocument();
    expect(
      screen.getByRole('cell', {
        name: `${formatCurrency(tip)}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${formatCurrency(total)}`)).toBeInTheDocument();
  });

  it('shows right tip amount on card click', () => {
    render(<TipPicker />);

    const cards = screen.getAllByRole('tip-card');
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveTextContent('CA$15.00');

    fireEvent.click(cards[3]);
    expect(cards[3]).toHaveTextContent('CA$30.00');
  });

  it('adds active class on card click', () => {
    render(<TipPicker />);

    const cards = screen.getAllByRole('tip-card');
    fireEvent.click(cards[0]);

    cards.forEach((card, idx) => {
      if (idx === 0) {
        expect(cards[idx]).toHaveClass('bg-cardColor text-mainLightColor');
      } else {
        expect(cards[idx]).toHaveClass('bg-mainLightColor text-cardColor');
      }
    });

    fireEvent.click(cards[2]);
    cards.forEach((card, idx) => {
      if (idx === 2) {
        expect(cards[idx]).toHaveClass('bg-cardColor text-mainLightColor');
      } else {
        expect(cards[idx]).toHaveClass('bg-mainLightColor text-cardColor');
      }
    });

    const customTipCard = screen.getByRole('custom-tip-card');
    fireEvent.click(customTipCard);
    expect(customTipCard).toHaveClass('bg-cardColor text-mainLightColor');
    cards.forEach((card) => {
      expect(card).toHaveClass('bg-mainLightColor text-cardColor');
    });
  });

  it('deselects a tip when clicked twice', () => {
    render(<TipPicker />);

    const customTipCard = screen.getByRole('custom-tip-card');

    fireEvent.click(customTipCard);
    expect(customTipCard).toHaveClass('bg-cardColor text-mainLightColor');

    fireEvent.click(customTipCard);
    expect(customTipCard).toHaveClass('bg-mainLightColor text-cardColor');
  });

  it('shows and hides the custom tip form correctly', () => {
    render(<TipPicker />);
    const customTipCard = screen.getByRole('custom-tip-card');

    fireEvent.click(customTipCard);
    expect(screen.getByLabelText(/custom amount/i)).toBeInTheDocument();

    fireEvent.click(customTipCard);
    expect(screen.queryByLabelText(/custom amount/i)).not.toBeInTheDocument();
  });

  it('calls setPaymentInfo and navigates on "Next" click', () => {
    render(<TipPicker />);
    const btn = screen.getByRole('button', { name: /next/i });

    fireEvent.click(btn);

    expect(mockSetPaymentInfo).toHaveBeenCalled();

    expect(mockPush).toHaveBeenCalledWith('/payment/confirmation');
  });
});
