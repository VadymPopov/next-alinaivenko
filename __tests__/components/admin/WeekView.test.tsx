import {
  mockedAppointments,
  mockedBlockedDates,
  mockedBlockedSlots,
} from '@/__tests__/mocks/mockData';
import { WeekView } from '@/components/admin';
import { useAppointments, useBlockedDates, useBlockedSlots } from '@/hooks';
import { Appointment, BlockedSlot } from '@/types';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/hooks', () => ({
  useAppointments: jest.fn(),
  useBlockedDates: jest.fn(),
  useBlockedSlots: jest.fn(),
}));

jest.mock('@/components/admin/WeekViewAppointment', () => ({
  __esModule: true,
  WeekViewAppointment: ({ appointment }: { appointment: Appointment }) => (
    <div data-testid="mocked-week-view-appt">
      Mocked WeekView Appointment <p>{appointment.name}</p>
    </div>
  ),
}));

jest.mock('@/components/admin/BlockedSlotView', () => ({
  __esModule: true,
  BlockedSlotView: ({ blockedSlot }: { blockedSlot: BlockedSlot }) => (
    <div
      data-testid="mocked-blocked-slot-view"
      className="absolute left-0 right-0"
    >
      {blockedSlot.reason}
    </div>
  ),
}));

jest.mock('@/components/admin/DayColumn', () => ({
  __esModule: true,
  DayColumn: () => <div data-testid="mocked-day-column">Mocked DayColumn</div>,
}));

describe('WeekView component', () => {
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

  it('renders correctly with initial data', () => {
    render(<WeekView />);

    expect(
      screen.getByRole('heading', { name: 'February, 2025', level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /today/i })).toBeInTheDocument();
    expect(screen.getByTestId('forward-icon')).toBeInTheDocument();
    expect(screen.getByTestId('back-icon')).toBeInTheDocument();

    const week = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    week.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    const days = [9, 10, 11, 12, 13, 14, 15];

    days.map((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    expect(screen.getAllByText('Mocked DayColumn')).toHaveLength(7);
  });

  it('ensures correct number of hours are rendered', () => {
    render(<WeekView />);
    const hours = [
      '11 AM',
      '12 PM',
      '1 PM',
      '2 PM',
      '3 PM',
      '4 PM',
      '5 PM',
      '6 PM',
      '7 PM',
      '8 PM',
    ];
    hours.forEach((hour) => {
      expect(screen.getByText(hour)).toBeInTheDocument();
    });
  });

  it('updates week correctly when navigating forward and backward', () => {
    render(<WeekView />);
    fireEvent.click(screen.getByTestId('forward-icon'));
    expect(useAppointments).toHaveBeenCalledWith({
      start: '2025-02-16',
      end: '2025-02-22',
    });

    fireEvent.click(screen.getByTestId('back-icon'));
    expect(useAppointments).toHaveBeenCalledWith({
      start: '2025-02-09',
      end: '2025-02-15',
    });
  });

  it('displays appointments from useAppointments hook', () => {
    render(<WeekView />);
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Test 3')).toBeInTheDocument();
  });

  it('displays blocked slots correctly', () => {
    render(<WeekView />);
    mockedBlockedSlots.forEach((slot) => {
      expect(screen.getByText(slot.reason)).toBeInTheDocument();
    });
  });

  it('calls hooks with correct arguments', () => {
    render(<WeekView />);
    expect(useAppointments).toHaveBeenCalledWith({
      start: '2025-02-09',
      end: '2025-02-15',
    });
    expect(useBlockedSlots).toHaveBeenCalledWith({
      start: new Date('2025-02-09T05:00:00.000Z'),
      end: new Date('2025-02-15T05:00:00.000Z'),
    });
    expect(useBlockedDates).toHaveBeenCalledWith(new Date());
  });

  it('resets to the current week when Today button is clicked', () => {
    render(<WeekView />);
    fireEvent.click(screen.getByText('Today'));
    expect(useAppointments).toHaveBeenCalledWith({
      start: '2025-02-09',
      end: '2025-02-15',
    });
  });

  it('displays blocked dates message correctly', () => {
    render(<WeekView />);
    expect(
      screen.getAllByText("It's your day off! Enjoy your break."),
    ).toHaveLength(3);
  });
});

it('handles empty state when no appointments or blocked slots exist', () => {
  (useAppointments as jest.Mock).mockReturnValue({ appointments: [] });
  (useBlockedSlots as jest.Mock).mockReturnValue({ slots: [] });
  render(<WeekView />);

  expect(
    screen.getAllByText('No appointments scheduled for this day'),
  ).toHaveLength(4);
});
