import { mockedAppointment } from '@/__tests__/mocks/mockData';
import { EditAppointmentForm } from '@/components/admin';
import { useAppointments, useSlots } from '@/hooks';

import toast from 'react-hot-toast';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

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

describe('EditAppointmentForm component', () => {
  let mockReplace: jest.Mock;
  let mockUpdateAppointment: jest.Mock;

  beforeEach(() => {
    mockReplace = jest.fn();
    mockUpdateAppointment = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (useSlots as jest.Mock).mockReturnValue({
      slots: ['11:00am', '12:00pm', '1:00pm', '5:00pm'],
    });

    (useAppointments as jest.Mock).mockReturnValue({
      updateAppointment: mockUpdateAppointment,
      isValidating: false,
    });
  });

  it('renders component correctly', () => {
    render(<EditAppointmentForm appointment={mockedAppointment} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/appointment date/i)).toBeInTheDocument();
    expect(screen.getByText(/service/i)).toBeInTheDocument();
    expect(screen.getByText(/duration/i)).toBeInTheDocument();
    expect(screen.getByText(/slot/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/amount/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/tax/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/fee/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/total/i)).toHaveLength(2);
    expect(screen.getByLabelText(/tip/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/brief description/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('pre-fills form fields with values', async () => {
    render(<EditAppointmentForm appointment={mockedAppointment} />);

    expect(screen.getByLabelText(/name/i)).toHaveValue('Test');
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@mail.com');
    expect(screen.getByLabelText(/appointment date/i)).toHaveValue(
      '10/02/2025',
    );
    expect(screen.getByText(/small tattoo/i)).toBeInTheDocument();
    expect(screen.getByText(/1h/i)).toBeInTheDocument();

    expect(screen.getByText('5:00pm')).toBeInTheDocument();
    expect(screen.getAllByLabelText(/amount/i)[0]).toHaveValue(100);
    expect(screen.getAllByLabelText(/tax/i)[0]).toHaveValue(13);
    expect(screen.getAllByLabelText(/fee/i)[0]).toHaveValue(5);
    expect(screen.getAllByLabelText(/total/i)[0]).toHaveValue(118);

    expect(screen.getAllByLabelText(/amount/i)[1]).toHaveValue(50);
    expect(screen.getAllByLabelText(/tax/i)[1]).toHaveValue(6.5);
    expect(screen.getAllByLabelText(/fee/i)[1]).toHaveValue(1.75);
    expect(screen.getByLabelText(/tip/i)).toHaveValue(10);
    expect(screen.getAllByLabelText(/total/i)[1]).toHaveValue(68.25);
  });

  it('submits filled form and navigates ', async () => {
    render(<EditAppointmentForm appointment={mockedAppointment} />);

    const name = screen.getByLabelText(/full name/i);
    const email = screen.getByLabelText(/email/i);
    await userEvent.clear(name);
    await userEvent.type(name, 'John Doe');
    await userEvent.clear(email);
    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.type(
      screen.getByLabelText(/brief description/i),
      'test brief description',
    );

    const serviceSelect = screen.getByTestId(/service/i);
    await userEvent.click(serviceSelect);

    const serviceOption = await screen.findByText('Large Tattoo');
    await userEvent.click(serviceOption);
    const durationSelect = screen.getByTestId(/duration/i);
    await userEvent.click(durationSelect);

    const durationOption = await screen.findByText('2h');
    await userEvent.click(durationOption);

    const slotSelect = screen.getByTestId(/slot/i);
    await userEvent.click(slotSelect);

    const slotOption = await screen.findByText('12:00pm');
    await userEvent.click(slotOption);

    const btn = screen.getByRole('button', { name: /save/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(mockUpdateAppointment).toHaveBeenCalledWith({
        _id: 'testid-1',
        description: 'test brief description',
        duration: '120',
        email: 'johndoe@mail.com',
        instagram: '',
        name: 'John Doe',
        phone: '',
        service: 'Large Tattoo',
        slot: '12:00pm',
        date: '2025-02-10',
        depositAmount: 100,
        depositTax: 13,
        depositFee: 5,
        depositTotal: 118,
        paymentAmount: 50,
        paymentTax: 6.5,
        paymentFee: 1.75,
        paymentTotal: 68.25,
        tip: 10,
        paymentIntentId: 'test-intent-id-1',
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'An appointment was successfully updated!',
        expect.any(Object),
      );
    });

    expect(mockReplace).toHaveBeenCalledWith('/admin/appointments');
  });

  it('displays validation errors for empty fields', async () => {
    render(<EditAppointmentForm appointment={mockedAppointment} />);

    await userEvent.clear(screen.getByLabelText(/full name/i));
    await userEvent.clear(screen.getByLabelText(/email/i));

    const btn = screen.getByRole('button', { name: /save/i });

    await userEvent.click(btn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('disables submit button if form has validation errors', async () => {
    render(<EditAppointmentForm appointment={mockedAppointment} />);

    await userEvent.clear(screen.getByLabelText(/full name/i));

    const btn = screen.getByRole('button', { name: /save/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');

    expect(btn).toBeEnabled();
  });

  it('displays error message if form submission fails', async () => {
    mockUpdateAppointment.mockRejectedValue(new Error('Server error'));
    render(<EditAppointmentForm appointment={mockedAppointment} />);

    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });
});
