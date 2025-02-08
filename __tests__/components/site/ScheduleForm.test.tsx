import { ScheduleForm } from '@/components/site';
import { useSlots } from '@/hooks';
import { useAppContext } from '@/providers/AppContext';

import toast from 'react-hot-toast';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/AppContext', () => ({
  useAppContext: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useSlots: jest.fn(),
}));

const mockedSlots = ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm'];

describe('ScheduleForm component', () => {
  let mockSetAppointmentInfo: jest.Mock;
  let mockPush: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetAppointmentInfo = jest.fn();
    mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useAppContext as jest.Mock).mockReturnValue({
      setAppointmentInfo: mockSetAppointmentInfo,
      appointmentInfo: null,
    });

    (useSlots as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      slots: mockedSlots,
    });
  });

  it('initializes with provided availableDate', () => {
    const availableDate = '2025-02-10';

    render(
      <ScheduleForm
        availableDate={availableDate}
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    expect(screen.getByText('February 10, 2025')).toBeInTheDocument();
  });

  it('renders component correctly', () => {
    render(
      <ScheduleForm
        availableDate={''}
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    const currMonth = format(new Date(), 'MMMM yyyy');

    expect(screen.getByText(/choose a time/i)).toBeInTheDocument();

    expect(screen.getByText(currMonth)).toBeInTheDocument();

    mockedSlots.forEach((slot) => {
      expect(screen.getByText(slot)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('disables submit button if slot has not been selected', async () => {
    render(
      <ScheduleForm
        availableDate={''}
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.click(screen.getByText(mockedSlots[0]));

    expect(btn).toBeEnabled();
  });

  it('displays validation errors if slot is not selected', async () => {
    render(
      <ScheduleForm
        availableDate={''}
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    await userEvent.click(screen.getByText(mockedSlots[0]));
    await userEvent.click(screen.getByText(mockedSlots[0]));

    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  });

  it('submits form and navigates to the next step', async () => {
    render(
      <ScheduleForm
        availableDate={''}
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.click(screen.getByText(mockedSlots[0]));

    await userEvent.click(btn);

    expect(mockPush).toHaveBeenCalledWith('/booking/payment');
    expect(mockSetAppointmentInfo).toHaveBeenCalled();
  });

  it('shows skeleton on isLoading is true', () => {
    (useSlots as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      slots: [],
    });

    render(
      <ScheduleForm
        availableDate={''}
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    expect(screen.getByTestId('skeleton-grid')).toBeInTheDocument();
  });

  it('shows an error if isError is true', () => {
    (useSlots as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      slots: [],
    });

    render(
      <ScheduleForm
        availableDate={''}
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    expect(
      screen.getByText('Error fetching slots. Please try again later.'),
    ).toBeInTheDocument();
  });

  it('shows a toast error message if fetching slots fails', () => {
    (useSlots as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      slots: [],
    });

    render(
      <ScheduleForm
        availableDate=""
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    expect(toast.error).toHaveBeenCalledWith('Error fetching slots');
  });

  it('calls setAppointmentInfo with correct data on submit', async () => {
    render(
      <ScheduleForm
        availableDate="2025-02-10"
        initialSlots={mockedSlots}
        maxDate={{ date: new Date() }}
        blockedDates={[]}
        duration={60}
      />,
    );

    await userEvent.click(screen.getByText(mockedSlots[1]));
    await userEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(mockSetAppointmentInfo).toHaveBeenCalledWith(
      expect.objectContaining({
        date: expect.any(Date),
        slot: mockedSlots[1],
        duration: 60,
      }),
    );
  });
});
