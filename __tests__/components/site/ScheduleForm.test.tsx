import { mockedSlots } from '@/__mocks__/mockData';
import { ScheduleForm } from '@/components/site';
import { useSlots } from '@/hooks';
import { useAppContext } from '@/providers/AppContext';

import toast from 'react-hot-toast';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

const renderComponent = (props = {}) => {
  render(
    <ScheduleForm
      availableDate={''}
      initialSlots={mockedSlots}
      maxDate={{ date: new Date() }}
      blockedDates={[]}
      duration={60}
      {...props}
    />,
  );
};

describe('ScheduleForm component', () => {
  const mockToday = new Date('2025-02-10T05:00:00.000Z');

  const mockSetAppointmentInfo = jest.fn();
  const mockPush = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockToday);
  });

  beforeEach(() => {
    jest.clearAllMocks();

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

    renderComponent({
      availableDate,
      maxDate: { date: new Date('2025-02-25T05:00:00.000Z') },
    });

    expect(screen.getByText('February 10, 2025')).toBeInTheDocument();
  });

  it('renders component correctly', () => {
    renderComponent({
      maxDate: { date: new Date('2025-02-25T05:00:00.000Z') },
    });

    const currMonth = format(new Date(), 'MMMM yyyy');

    expect(screen.getByText(/choose a time/i)).toBeInTheDocument();

    expect(screen.getByText(currMonth)).toBeInTheDocument();

    mockedSlots.forEach((slot) => {
      expect(screen.getByText(slot)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('disables submit button if slot has not been selected', async () => {
    renderComponent({
      availableDate: '2025-02-12',
      maxDate: { date: new Date('2025-02-27T05:00:00.000Z') },
    });

    const btn = screen.getByRole('button', { name: /next/i });

    fireEvent.click(btn);
    expect(btn).toBeDisabled();

    fireEvent.click(screen.getByText('22'));
    fireEvent.click(screen.getByText(mockedSlots[0]));

    await waitFor(() => {
      expect(btn).toBeEnabled();
    });
  });

  it('displays validation errors if slot is not selected', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('22'));
    fireEvent.click(screen.getByText(mockedSlots[0]));
    fireEvent.click(screen.getByText(mockedSlots[0]));

    await waitFor(() => {
      expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    });
  });

  it('submits form and navigates to the next step', async () => {
    renderComponent({
      availableDate: '2025-02-12',
      maxDate: { date: new Date('2025-02-25T05:00:00.000Z') },
    });

    const btn = screen.getByRole('button', { name: /next/i });

    fireEvent.click(screen.getByText('15'));
    expect(screen.getByText(/February 15, 2025/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(mockedSlots[1]));
    expect(screen.getByText(mockedSlots[1])).toHaveClass('bg-accentColor');

    await waitFor(() => expect(btn).toBeEnabled());

    fireEvent.click(btn);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/booking/payment');
    });

    await waitFor(() => {
      expect(mockSetAppointmentInfo).toHaveBeenCalled();
    });
  });

  it('shows skeleton on isLoading is true', () => {
    (useSlots as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      slots: [],
    });

    renderComponent();

    expect(screen.getByTestId('skeleton-grid')).toBeInTheDocument();
  });

  it('shows an error if isError is true', () => {
    (useSlots as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      slots: [],
    });

    renderComponent();

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

    renderComponent();

    expect(toast.error).toHaveBeenCalledWith('Error fetching slots');
  });

  it('calls setAppointmentInfo with correct data on submit', async () => {
    renderComponent({
      availableDate: '2025-02-12',
      maxDate: { date: new Date('2025-02-25T05:00:00.000Z') },
    });

    const btn = screen.getByRole('button', { name: /next/i });

    fireEvent.click(screen.getByText('20'));
    expect(screen.getByText(/February 20, 2025/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(mockedSlots[0]));
    expect(screen.getByText(mockedSlots[0])).toHaveClass('bg-accentColor');

    await waitFor(() => expect(btn).toBeEnabled());

    fireEvent.click(btn);

    await waitFor(() =>
      expect(mockSetAppointmentInfo).toHaveBeenCalledWith(
        expect.objectContaining({
          date: new Date('2025-02-20T05:00:00.000Z'),
          slot: mockedSlots[0],
          duration: 60,
        }),
      ),
    );
  });
});
