import {
  mockedAppointments,
  mockedBlockedDates,
  mockedBlockedSlots,
} from '@/__tests__/mocks/mockData';
import { DayColumn } from '@/components/admin';
import { Appointment, BlockedSlot } from '@/types';
import { getTimeSlots } from '@/utils/helpers';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/admin/BlockedSlotView', () => ({
  __esModule: true,
  BlockedSlotView: ({ blockedSlot }: { blockedSlot: BlockedSlot }) => (
    <div data-testid="mocked-blocked-slot-view">
      Mocked Blocked Slot View <p>{blockedSlot.reason}</p>
    </div>
  ),
}));

jest.mock('@/components/admin/WeekViewAppointment', () => ({
  __esModule: true,
  WeekViewAppointment: ({ appointment }: { appointment: Appointment }) => (
    <div data-testid="mocked-week-view-appt">
      Mocked WeekView Appointment <p>{appointment.name}</p>
    </div>
  ),
}));

describe('DayColumn component', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders correct number of time slots', () => {
    render(
      <DayColumn
        day={new Date('2025-02-10T05:00:00.000Z')}
        slotHeight={100}
        blockedSlots={mockedBlockedSlots}
        appointments={mockedAppointments}
        blockedDates={mockedBlockedDates}
      />,
    );

    expect(screen.getAllByTestId('time-slot')).toHaveLength(
      getTimeSlots().length,
    );
  });

  it('renders appointments correctly', () => {
    render(
      <DayColumn
        day={new Date('2025-02-11T05:00:00.000Z')}
        slotHeight={100}
        blockedSlots={mockedBlockedSlots}
        appointments={mockedAppointments}
        blockedDates={mockedBlockedDates}
      />,
    );

    mockedAppointments
      .filter((appt) => appt.date === '2025-02-11')
      .forEach((appt) => {
        expect(screen.getByText(appt.name)).toBeInTheDocument();
      });
  });

  it('renders blocked slots correctly', () => {
    render(
      <DayColumn
        day={new Date('2025-02-10T05:00:00.000Z')}
        slotHeight={100}
        blockedSlots={mockedBlockedSlots}
        appointments={mockedAppointments}
        blockedDates={mockedBlockedDates}
      />,
    );

    mockedBlockedSlots
      .filter((slot) => slot.date === '2025-02-10')
      .forEach((slot) => {
        expect(screen.getByText(slot.reason)).toBeInTheDocument();
      });
  });

  it('renders blocked day correctly', () => {
    render(
      <DayColumn
        day={new Date('2025-02-13T05:00:00.000Z')}
        slotHeight={100}
        blockedSlots={mockedBlockedSlots}
        appointments={mockedAppointments}
        blockedDates={mockedBlockedDates}
      />,
    );

    const slots = screen.getAllByTestId('time-slot');
    slots.map((slot) => {
      expect(slot).toHaveClass('cursor-not-allowed dayoff');
    });

    const icons = screen.getAllByTestId('add-icon');
    icons.map((icon) => {
      expect(icon).toHaveClass('hidden');
    });
  });

  it('handles slot click and triggers router push', () => {
    render(
      <DayColumn
        day={new Date('2025-02-10T05:00:00.000Z')}
        slotHeight={100}
        blockedSlots={mockedBlockedSlots}
        appointments={mockedAppointments}
        blockedDates={mockedBlockedDates}
      />,
    );

    const slot = screen.getAllByTestId('time-slot')[1];
    fireEvent.click(slot);
    expect(mockPush).toHaveBeenCalledWith(
      '/admin/appointments/add?slot=11:30am&date=Mon Feb 10 2025 00:00:00 GMT-0500 (Eastern Standard Time)',
    );
  });
});
