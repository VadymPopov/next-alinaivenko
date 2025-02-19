import { BlockedSlotView } from '@/components/admin';
import { useBlockedSlots } from '@/hooks';
import { useSidebar } from '@/providers/SidebarContext';
import { BlockedSlot } from '@/types';
import { convertToTimeRange } from '@/utils';
import { formatDuration, getParsedDate } from '@/utils/helpers';

import toast from 'react-hot-toast';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { format } from 'date-fns';

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useBlockedSlots: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockedBlockedSlot: BlockedSlot = {
  _id: 'blocked-1',
  date: '2025-02-10',
  slot: '11:00am',
  duration: 60,
  reason: 'Staff Meeting',
};

describe('BlockedSlotView component', () => {
  let mockDeleteBlockedSlot: jest.Mock;

  beforeEach(() => {
    mockDeleteBlockedSlot = jest.fn();

    (useBlockedSlots as jest.Mock).mockReturnValue({
      deleteBlockedSlot: mockDeleteBlockedSlot,
    });

    (useSidebar as jest.Mock).mockReturnValue({
      isExtended: false,
    });
  });

  it('renders component correctly', () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} />);

    expect(screen.getByText('Blocked Slot')).toBeInTheDocument();
    expect(
      screen.getByText(
        convertToTimeRange(mockedBlockedSlot.slot, mockedBlockedSlot.duration),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(mockedBlockedSlot.reason)).toBeInTheDocument();

    expect(screen.getByLabelText('Delete blocked slot')).toBeInTheDocument();
  });

  it('renders confirmation buttons when deleteFlag is true', async () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} />);
    fireEvent.click(screen.getByLabelText('Delete blocked slot'));

    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
  });

  it('calls deleteBlockedSlot callback when "Yes" is clicked', async () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} />);

    fireEvent.click(screen.getByLabelText('Delete blocked slot'));
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));

    await waitFor(() =>
      expect(mockDeleteBlockedSlot).toHaveBeenCalledWith(mockedBlockedSlot._id),
    );
    expect(toast.success).toHaveBeenCalledWith(
      'Blocked slot was successfully deleted!',
      expect.any(Object),
    );
  });

  it('shows error toast when deletion fails', async () => {
    mockDeleteBlockedSlot.mockRejectedValue(new Error('Failed to delete'));

    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} />);

    fireEvent.click(screen.getByLabelText('Delete blocked slot'));
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Failed to delete'),
    );
  });

  it('does not call deleteBlockedSlot callback when "No" is clicked', async () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} />);

    fireEvent.click(screen.getByLabelText('Delete blocked slot'));
    fireEvent.click(screen.getByRole('button', { name: /no/i }));

    await waitFor(() => expect(mockDeleteBlockedSlot).not.toHaveBeenCalled());
  });

  it('hides confirm buttons when "Yes" is clicked', async () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} />);

    fireEvent.click(screen.getByLabelText('Delete blocked slot'));
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /yes/i }));

    expect(
      screen.queryByRole('button', { name: /yes/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /no/i }),
    ).not.toBeInTheDocument();
  });

  it('hides confirm buttons when "No" is clicked', async () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} />);

    fireEvent.click(screen.getByLabelText('Delete blocked slot'));
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /no/i }));

    expect(
      screen.queryByRole('button', { name: /yes/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /no/i }),
    ).not.toBeInTheDocument();
  });

  it('renders component correctly when isCard is true', () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} isCard={true} />);

    expect(screen.getByTestId('blocked-slot-card')).toHaveClass(
      'flex sm:flex-wrap items-center gap-2.5 justify-between lg:hidden border border-accentColor rounded-lg p-4 bg-mainLightColor shadow-lg hover:shadow-none hover:bg-bgColor transition-colors',
    );

    expect(screen.getByText('Blocked Slot')).toBeInTheDocument();
    expect(
      screen.getByText(
        format(getParsedDate(mockedBlockedSlot.date), 'dd.MM.yyyy'),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        convertToTimeRange(mockedBlockedSlot.slot, mockedBlockedSlot.duration),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(mockedBlockedSlot.slot)).toBeInTheDocument();
    expect(
      screen.getByText(formatDuration(mockedBlockedSlot.duration)),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(mockedBlockedSlot.reason),
    ).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('applies correct styles when isCard is true', () => {
    render(<BlockedSlotView blockedSlot={mockedBlockedSlot} isCard={true} />);

    expect(screen.getByTestId('blocked-slot-card')).toHaveClass(
      'flex sm:flex-wrap items-center gap-2.5 justify-between lg:hidden border border-accentColor rounded-lg p-4 bg-mainLightColor shadow-lg hover:shadow-none hover:bg-bgColor transition-colors',
    );
  });

  it('applies className if provided', () => {
    render(
      <BlockedSlotView
        blockedSlot={mockedBlockedSlot}
        className={'text-mainDarkColor bg-accentColor'}
      />,
    );

    expect(screen.getByTestId('blocked-slot-card')).toHaveClass(
      'text-mainDarkColor bg-accentColor',
    );
  });

  it('applies style if provided', () => {
    render(
      <BlockedSlotView
        blockedSlot={mockedBlockedSlot}
        style={{
          height: '100px',
          top: '200px',
        }}
      />,
    );

    expect(screen.getByTestId('blocked-slot-card')).toHaveStyle(
      'height: 100px;  top: 200px',
    );
  });
});
