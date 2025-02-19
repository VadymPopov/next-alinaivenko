import {
  mockedAppointments,
  mockedBlockedSlots,
} from '@/__tests__/mocks/mockData';
import { AppointmentsTable } from '@/components/admin';
import { APPT_TABLE_HEADERS } from '@/constants';
import { BlockedSlot } from '@/types';
import { formatCurrency } from '@/utils/helpers';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

const mockedCombinedSlots = [...mockedAppointments, ...mockedBlockedSlots];

describe('AppointmentsTable component', () => {
  it('renders component correctly with appt only', () => {
    render(
      <AppointmentsTable
        headers={APPT_TABLE_HEADERS}
        appointments={mockedAppointments}
      />,
    );

    APPT_TABLE_HEADERS.map((header) => {
      expect(
        screen.getByRole('columnheader', { name: header }),
      ).toBeInTheDocument();
    });

    mockedAppointments.map((appt) => {
      expect(screen.getByText(appt.name)).toBeInTheDocument();
    });
  });

  it('shows message when appointments array is empty', () => {
    render(
      <AppointmentsTable headers={APPT_TABLE_HEADERS} appointments={[]} />,
    );

    expect(
      screen.getAllByText(/no appointments found/i)[0],
    ).toBeInTheDocument();
  });

  it('shows loading message when isLoading is true', () => {
    render(
      <AppointmentsTable
        headers={APPT_TABLE_HEADERS}
        appointments={[]}
        isLoading={true}
      />,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders component correctly with blocked slots', () => {
    render(
      <AppointmentsTable
        headers={APPT_TABLE_HEADERS}
        appointments={[]}
        combinedApptSlots={mockedCombinedSlots}
      />,
    );

    mockedCombinedSlots.map((item) => {
      'reason' in item
        ? expect(screen.getByText(item.reason)).toBeInTheDocument()
        : expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('mocked-blocked-slot-view')).toHaveLength(4);
  });

  it('shows no appointments found when combinedApptSlots is empty', () => {
    render(
      <AppointmentsTable
        headers={APPT_TABLE_HEADERS}
        appointments={[]}
        combinedApptSlots={[]}
      />,
    );

    expect(
      screen.getAllByText(/no appointments found/i)[1],
    ).toBeInTheDocument();
  });

  it('renders new appointments correctly when isNew is true', () => {
    render(
      <AppointmentsTable
        headers={APPT_TABLE_HEADERS}
        appointments={mockedAppointments}
        isNew={true}
      />,
    );

    mockedAppointments.forEach((appt) => {
      expect(
        screen.getByText(formatCurrency(appt.deposit.amount)),
      ).toBeInTheDocument();
    });
  });
});
