import {
  mockedAppointments,
  mockedBlockedDates,
  mockedBlockedSlots,
} from '@/__tests__/mocks/mockData';
import { DayView } from '@/components/admin';
import { useAppointments, useBlockedDates, useBlockedSlots } from '@/hooks';
import { Appointment, BlockedSlot } from '@/types';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/hooks', () => ({
  useAppointments: jest.fn(),
  useBlockedDates: jest.fn(),
  useBlockedSlots: jest.fn(),
}));

jest.mock('@/components/admin/AppointmentsTable', () => ({
  __esModule: true,
  AppointmentsTable: ({
    appointments,
    combinedApptSlots,
  }: {
    appointments: Appointment[];
    combinedApptSlots: BlockedSlot[];
  }) => (
    <>
      {appointments.map((appt) => (
        <div key={appt._id} data-testid="mocked-week-view-appt">
          <p>{appt.name}</p>
        </div>
      ))}
      {combinedApptSlots.map((slot) => (
        <div key={slot._id} data-testid="mocked-week-view-blocked-slot">
          <p>{slot.reason}</p>
        </div>
      ))}
    </>
  ),
}));

describe('DayView component', () => {
  const mockToday = new Date('2025-02-10T05:00:00.000Z');

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockToday);
  });

  beforeEach(() => {
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: mockedAppointments,
    });
    (useBlockedDates as jest.Mock).mockReturnValue({
      dates: mockedBlockedDates,
    });
    (useBlockedSlots as jest.Mock).mockReturnValue({
      slots: mockedBlockedSlots,
    });
  });

  it('renders DayView component with title and date picker', () => {
    render(<DayView />);

    expect(
      screen.getByRole('heading', { name: 'Appointments', level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays appointments from useAppointments hook', () => {
    render(<DayView />);
    expect(screen.getByText('Test 1')).toBeInTheDocument();
  });

  it('displays blocked slots from useBlockedSlots hook', () => {
    render(<DayView />);
    mockedBlockedSlots
      .filter((slot) => slot.date !== '2025-02-10')
      .map((slot) => {
        expect(screen.getByText(slot.reason)).toBeInTheDocument();
      });
  });

  it('calls hooks with correct arguments', () => {
    render(<DayView />);
    expect(useAppointments).toHaveBeenCalledWith({
      date: '2025-02-10',
    });
    expect(useBlockedSlots).toHaveBeenCalledWith({
      date: '2025-02-10',
    });
    expect(useBlockedDates).toHaveBeenCalledWith(new Date());
  });

  it('updates appointments when a new date is selected', () => {
    render(<DayView />);
    const dateCell = screen.getByText('11');

    fireEvent.click(dateCell);

    expect(useAppointments).toHaveBeenCalledWith({ date: '2025-02-11' });
  });

  it('filters blocked dates from the date picker', () => {
    render(<DayView />);
    expect(screen.queryByText('9')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.queryByText('13')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.queryByText('14')).toHaveAttribute('aria-disabled', 'true');
  });

  it('highlights the current date on initial render', () => {
    render(<DayView />);
    const today = screen.getByText('10');
    expect(today).toHaveClass('react-datepicker__day--selected');
  });
});
