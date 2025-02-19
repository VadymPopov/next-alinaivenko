import { AddAppointmentForm } from '@/components/admin';
import { useAppointments, useSlots } from '@/hooks';

import toast from 'react-hot-toast';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useSlots: jest.fn(),
  useAppointments: jest.fn(),
}));

describe('AddAppointmentForm component', () => {
  let mockReplace: jest.Mock;
  let mockSearchParams: URLSearchParams;
  let mockAddAppointment: jest.Mock;

  beforeEach(() => {
    mockReplace = jest.fn();
    mockAddAppointment = jest.fn();
    mockSearchParams = new URLSearchParams({
      date: '10-02-2025',
      slot: '11:00am',
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (useSlots as jest.Mock).mockReturnValue({
      slots: ['11:00am', '12:00pm', '1:00pm'],
    });

    (useAppointments as jest.Mock).mockReturnValue({
      addAppointment: mockAddAppointment,
      isValidating: false,
    });
  });

  it('renders component correctly', () => {
    render(<AddAppointmentForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/appointment date/i)).toBeInTheDocument();
    expect(screen.getByText(/service/i)).toBeInTheDocument();
    expect(screen.getByText(/duration/i)).toBeInTheDocument();
    expect(screen.getByText(/slot/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/brief description/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('pre-fills form fields with values from searchParams', () => {
    render(<AddAppointmentForm />);

    expect(screen.getByLabelText(/appointment date/i)).toHaveValue(
      '02/10/2025',
    );
    expect(screen.getByText(/11:00am/i)).toBeInTheDocument();
  });

  it('submits filled form and navigates ', async () => {
    render(<AddAppointmentForm />);

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');
    await userEvent.type(
      screen.getByLabelText(/brief description/i),
      'test brief description',
    );

    const serviceSelect = screen.getByTestId(/service/i);
    await userEvent.click(serviceSelect);

    const serviceOption = await screen.findByText('Small Tattoo');
    await userEvent.click(serviceOption);
    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);

    const durationOption = await screen.findByText('1h');
    await userEvent.click(durationOption);

    const btn = screen.getByRole('button', { name: /add/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(mockAddAppointment).toHaveBeenCalledWith({
        newAppt: {
          description: 'test brief description',
          duration: 60,
          email: 'johndoe@mail.com',
          instagram: '',
          name: 'John Doe',
          phone: '',
          service: 'Small Tattoo',
          slot: '11:00am',
          date: '2025-10-02',
          deposit: {
            amount: 0,
            tax: 0,
            fee: 0,
            total: 0,
          },
        },
        url: '/api/admin/appointments',
      });
    });

    expect(mockReplace).toHaveBeenCalledWith('/admin/appointments');
  });

  it('displays validation errors for empty fields', async () => {
    render(<AddAppointmentForm />);

    const btn = screen.getByRole('button', { name: /add/i });

    await userEvent.click(btn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/service is required/i)).toBeInTheDocument();
    expect(screen.getByText(/duration is required/i)).toBeInTheDocument();
  });

  it('removes validation errors when fields are corrected', async () => {
    render(<AddAppointmentForm />);

    await userEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');

    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    });
  });

  it('disables submit button if form has validation errors', async () => {
    render(<AddAppointmentForm />);

    const btn = screen.getByRole('button', { name: /add/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');
    await userEvent.type(
      screen.getByLabelText(/brief description/i),
      'test brief description',
    );

    const serviceSelect = screen.getByTestId(/service/i);
    await userEvent.click(serviceSelect);

    const serviceOption = await screen.findByText('Small Tattoo');
    await userEvent.click(serviceOption);
    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);

    const durationOption = await screen.findByText('1h');
    await userEvent.click(durationOption);

    expect(btn).toBeEnabled();
  });

  it('displays error message if form submission fails', async () => {
    mockAddAppointment.mockRejectedValue(new Error('Server error'));
    render(<AddAppointmentForm />);

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');

    const serviceSelect = screen.getByTestId(/service/i);
    await userEvent.click(serviceSelect);
    await userEvent.click(await screen.findByText('Small Tattoo'));

    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);
    await userEvent.click(await screen.findByText('1h'));

    await userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });
});
