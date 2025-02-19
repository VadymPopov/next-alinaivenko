import { SetMaxBookingDateForm } from '@/components/admin';
import { useMaxBookingDate } from '@/hooks';

import toast from 'react-hot-toast';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockedDate = {
  _id: 'test-id-1',
  date: new Date('2025-02-10T05:00:00.000Z'),
};

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useMaxBookingDate: jest.fn(),
}));

describe('SetMaxBookingDateForm component', () => {
  let mockMutate: jest.Mock;

  const mockToday = new Date('2025-02-08T05:00:00.000Z');

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockToday);
  });

  beforeEach(() => {
    mockMutate = jest.fn().mockImplementation(async (data) => {
      return Promise.resolve(data);
    });

    (useMaxBookingDate as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      error: false,
      isLoading: false,
      data: { _id: 'test-id-1', date: '2025-02-10T05:00:00.000Z' },
    });
  });

  it('renders component correctly', () => {
    render(<SetMaxBookingDateForm maxDate={mockedDate} />);
    expect(
      screen.getByRole('heading', { name: 'Maximum Booking Date', level: 2 }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/select a date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select a date/i)).toHaveValue(
      '10/02/2025',
    );

    expect(screen.getByRole('button', { name: /set/i })).toBeInTheDocument();
  });

  it('submits filled form ', async () => {
    render(<SetMaxBookingDateForm maxDate={mockedDate} />);

    fireEvent.click(screen.getByPlaceholderText(/select a date/i));
    fireEvent.click(screen.getByText('12'));

    const btn = screen.getByRole('button', { name: /set/i });

    fireEvent.click(btn);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        _id: 'test-id-1',
        date: new Date('2025-02-12T05:00:00.000Z'),
      });
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Max booking date was successfully updated!',
        expect.any(Object),
      );
    });
  });

  it('displays validation errors for empty fields', async () => {
    render(<SetMaxBookingDateForm maxDate={mockedDate} />);
    const input = screen.getByPlaceholderText(/select a date/i);
    fireEvent.change(input, { target: { value: '' } });

    const btn = screen.getByRole('button', { name: /set/i });

    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    });
  });

  it('disables submit button if form has validation errors', async () => {
    render(<SetMaxBookingDateForm maxDate={mockedDate} />);

    const input = screen.getByPlaceholderText(/select a date/i);
    fireEvent.change(input, { target: { value: '' } });

    const btn = screen.getByRole('button', { name: /set/i });

    fireEvent.click(btn);

    await waitFor(() => {
      expect(btn).toBeDisabled();
    });

    fireEvent.change(input, { target: { value: '2025-12-02' } });

    await waitFor(() => {
      expect(btn).toBeEnabled();
    });
  });

  it('displays error message if form submission fails', async () => {
    mockMutate.mockRejectedValue(new Error('Server error'));
    render(<SetMaxBookingDateForm maxDate={mockedDate} />);
    const input = screen.getByPlaceholderText(/select a date/i);
    fireEvent.change(input, { target: { value: '2025-12-02' } });

    fireEvent.click(screen.getByRole('button', { name: /set/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });
});
