import { BlockSlotForm } from '@/components/admin';
import { useBlockedSlots, useSlots } from '@/hooks';

import toast from 'react-hot-toast';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useSlots: jest.fn(),
  useBlockedSlots: jest.fn(),
}));

describe('BlockSlotForm component', () => {
  let mockAddBlockedSlots: jest.Mock;

  beforeEach(() => {
    mockAddBlockedSlots = jest.fn();

    (useSlots as jest.Mock).mockReturnValue({
      slots: ['11:00am', '12:00pm', '1:00pm'],
    });

    (useBlockedSlots as jest.Mock).mockReturnValue({
      addBlockedSlot: mockAddBlockedSlots,
      isValidating: false,
      error: false,
    });
  });

  it('renders component correctly', () => {
    render(<BlockSlotForm />);
    expect(
      screen.getByRole('heading', { name: 'Block slot', level: 2 }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByText(/duration/i)).toBeInTheDocument();
    expect(screen.getByText('Slot')).toBeInTheDocument();
    expect(screen.getByLabelText(/reason/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('submits form', async () => {
    render(<BlockSlotForm />);

    const slotSelect = screen.getByTestId(/slot/i);
    await userEvent.click(slotSelect);

    const slotOption = await screen.findByText('12:00pm');
    await userEvent.click(slotOption);
    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);

    const durationOption = await screen.findByText('1h');
    await userEvent.click(durationOption);

    await userEvent.type(screen.getByLabelText(/reason/i), 'test meeting');

    const btn = screen.getByRole('button', { name: /add/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(mockAddBlockedSlots).toHaveBeenCalledWith({
        reason: 'test meeting',
        duration: 60,
        slot: '12:00pm',
        date: format(new Date(), 'yyyy-MM-dd'),
      });
    });

    expect(toast.success).toHaveBeenCalledWith(
      'Selected slot was successfully blocked!',
      expect.any(Object),
    );
  });

  it('displays error message if form submission fails', async () => {
    mockAddBlockedSlots.mockRejectedValue(new Error('Server error'));
    render(<BlockSlotForm />);

    const slotSelect = screen.getByTestId(/slot/i);
    await userEvent.click(slotSelect);

    const slotOption = await screen.findByText('12:00pm');
    await userEvent.click(slotOption);
    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);

    const durationOption = await screen.findByText('1h');
    await userEvent.click(durationOption);

    const btn = screen.getByRole('button', { name: /add/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });

  it('displays validation errors for empty fields', async () => {
    render(<BlockSlotForm />);

    const btn = screen.getByRole('button', { name: /add/i });

    await userEvent.click(btn);

    expect(screen.getByText(/duration is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  });

  it('removes validation errors when fields are corrected', async () => {
    render(<BlockSlotForm />);

    await userEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/duration is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();

    const slotSelect = screen.getByTestId(/slot/i);
    await userEvent.click(slotSelect);

    const slotOption = await screen.findByText('12:00pm');
    await userEvent.click(slotOption);
    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);

    const durationOption = await screen.findByText('1h');
    await userEvent.click(durationOption);

    await waitFor(() => {
      expect(
        screen.queryByText(/duration is required/i),
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/time is required/i)).not.toBeInTheDocument();
    });
  });

  it('disables submit button if form has validation errors', async () => {
    render(<BlockSlotForm />);

    const btn = screen.getByRole('button', { name: /add/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    const slotSelect = screen.getByTestId(/slot/i);
    await userEvent.click(slotSelect);

    const slotOption = await screen.findByText('12:00pm');
    await userEvent.click(slotOption);
    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);

    const durationOption = await screen.findByText('1h');
    await userEvent.click(durationOption);

    expect(btn).toBeEnabled();
  });

  it('shows loading state while submitting', async () => {
    (useBlockedSlots as jest.Mock).mockReturnValue({
      addBlockedSlot: jest.fn(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      ),
      isValidating: true,
      error: false,
    });

    render(<BlockSlotForm />);
    const btn = screen.getByRole('button', { name: /adding.../i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('shows error when useBlockedSlots return error', async () => {
    (useBlockedSlots as jest.Mock).mockReturnValue({
      addBlockedSlot: jest.fn(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      ),
      isValidating: true,
      error: { message: 'Error while processing data' },
    });

    render(<BlockSlotForm />);
    expect(
      screen.getByText(/error while processing data/i),
    ).toBeInTheDocument();
  });
});
