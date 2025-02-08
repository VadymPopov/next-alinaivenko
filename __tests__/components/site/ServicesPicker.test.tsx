import { ServicesPicker } from '@/components/site';
import { SERVICES } from '@/constants';
import { useAppContext } from '@/providers/AppContext';
import { getDepositBreakdown } from '@/utils/helpers';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/AppContext', () => ({
  useAppContext: jest.fn(),
}));

describe('ServicesPicker component', () => {
  let mockSetService: jest.Mock;
  let mockSetAppointmentInfo: jest.Mock;
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockSetAppointmentInfo = jest.fn();

    mockSetService = jest.fn();
    mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useAppContext as jest.Mock).mockReturnValue({
      setService: mockSetService,
      setAppointmentInfo: mockSetAppointmentInfo,
      service: null,
    });
  });

  it('renders component correctly', () => {
    render(<ServicesPicker />);

    SERVICES.forEach(({ title, duration, deposit }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getAllByText(duration)[0]).toBeInTheDocument();
      expect(screen.getAllByText(deposit)[0]).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('applies active class to the initially selected service from context', () => {
    (useAppContext as jest.Mock).mockReturnValue({
      setService: mockSetService,
      setAppointmentInfo: mockSetAppointmentInfo,
      service: 'Large Tattoo',
    });

    render(<ServicesPicker />);
    const secondCard = screen.getAllByRole('listitem')[1];

    expect(secondCard).toHaveClass(
      'bg-cardColor text-mainLightColor shadow-2xl',
    );
  });

  it('adds active class on card click', () => {
    render(<ServicesPicker />);

    const cards = screen.getAllByRole('listitem');
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveClass('bg-cardColor text-mainLightColor shadow-2xl');
    expect(cards[1]).toHaveClass(
      'bg-mainLightColor text-cardColor',
      'border-accentColor',
    );
    expect(cards[2]).toHaveClass(
      'bg-mainLightColor text-cardColor',
      'border-accentColor',
    );
    expect(cards[3]).toHaveClass(
      'bg-mainLightColor text-cardColor',
      'border-accentColor',
    );

    fireEvent.click(cards[2]);
    expect(cards[2]).toHaveClass('bg-cardColor text-mainLightColor shadow-2xl');
    expect(cards[0]).toHaveClass(
      'bg-mainLightColor text-cardColor',
      'border-accentColor',
    );
    expect(cards[1]).toHaveClass(
      'bg-mainLightColor text-cardColor',
      'border-accentColor',
    );
    expect(cards[3]).toHaveClass(
      'bg-mainLightColor text-cardColor',
      'border-accentColor',
    );
  });

  it('deselects a service when clicked twice', () => {
    render(<ServicesPicker />);
    const firstCard = screen.getAllByRole('listitem')[0];

    fireEvent.click(firstCard);
    expect(firstCard).toHaveClass(
      'bg-cardColor text-mainLightColor shadow-2xl',
    );

    fireEvent.click(firstCard);
    expect(firstCard).toHaveClass(
      'bg-mainLightColor text-cardColor border-accentColor',
    );
  });

  it('does not call setService or setAppointmentInfo when "Next" is clicked without a selected service', () => {
    render(<ServicesPicker />);
    const btn = screen.getByRole('button', { name: /next/i });

    fireEvent.click(btn);
    expect(mockSetService).not.toHaveBeenCalled();
    expect(mockSetAppointmentInfo).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('calls setService, setAppointmentInfo, and navigates on "Next" click when a service is selected', () => {
    (useAppContext as jest.Mock).mockReturnValue({
      setService: mockSetService,
      setAppointmentInfo: mockSetAppointmentInfo,
      service: 'Permanent Makeup',
    });

    render(<ServicesPicker />);
    const btn = screen.getByRole('button', { name: /next/i });

    fireEvent.click(btn);

    const breakdown = getDepositBreakdown('Permanent Makeup');

    expect(mockSetService).toHaveBeenCalledWith('Permanent Makeup');
    expect(mockSetAppointmentInfo).toHaveBeenCalledWith({
      ...breakdown,
    });
    expect(mockPush).toHaveBeenCalledWith('/booking/client-info');
  });

  it('hides the Next button when no service is selected', () => {
    render(<ServicesPicker />);
    const btn = screen.getByRole('button', { name: /next/i });

    expect(btn).toHaveStyle('opacity: 0');
  });
});
