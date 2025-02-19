import { mockedAppointment } from '@/__tests__/mocks/mockData';
import { AppointmentDetails } from '@/components/admin';
import { useAppointments } from '@/hooks';
import { serviceType } from '@/types';

import toast from 'react-hot-toast';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useAppointments: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('@/components/admin/AppointmentView', () => ({
  __esModule: true,
  AppointmentView: () => (
    <div data-testid="mocked-appointment-view">Mocked AppointmentView</div>
  ),
}));

jest.mock('@/components/admin/EditAppointmentForm', () => ({
  __esModule: true,
  EditAppointmentForm: () => (
    <div data-testid="mocked-edit-appointment-form">
      Mocked EditAppointmentForm
    </div>
  ),
}));

describe('AppointmentDetails component', () => {
  let mockReplace: jest.Mock;
  let mockBack: jest.Mock;
  let mockDeleteAppointment: jest.Mock;

  beforeEach(() => {
    mockReplace = jest.fn();
    mockBack = jest.fn();
    mockDeleteAppointment = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
      back: mockBack,
    });

    (useAppointments as jest.Mock).mockReturnValue({
      deleteAppointment: mockDeleteAppointment,
    });
  });

  it('renders correct appointment details', () => {
    render(<AppointmentDetails appointment={mockedAppointment} />);

    expect(
      screen.getByRole('button', {
        name: /back/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /appointment details/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
    expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-appointment-view')).toBeInTheDocument();
  });

  it('calls router navigation on back btn click', () => {
    render(<AppointmentDetails appointment={mockedAppointment} />);
    const btn = screen.getByRole('button', {
      name: /back/i,
    });
    fireEvent.click(btn);
    expect(mockBack).toHaveBeenCalled();
  });

  it('shows confirm buttons and calls deleteAppointment on delete btn click', async () => {
    render(<AppointmentDetails appointment={mockedAppointment} />);

    fireEvent.click(screen.getByTestId('delete-btn'));

    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /yes/i }));
    await waitFor(() =>
      expect(mockDeleteAppointment).toHaveBeenCalledWith(mockedAppointment._id),
    );
    expect(toast.success).toHaveBeenCalledWith(
      'An appointment was successfully deleted!',
      expect.any(Object),
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/admin/appointments');
    });
  });

  it('handles delete failure', async () => {
    mockDeleteAppointment.mockRejectedValueOnce(new Error('Failed to delete'));
    render(<AppointmentDetails appointment={mockedAppointment} />);
    fireEvent.click(screen.getByTestId('delete-btn'));
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Failed to delete'),
    );
  });

  it('hides confirm buttons when clicking no', async () => {
    render(<AppointmentDetails appointment={mockedAppointment} />);

    fireEvent.click(screen.getByTestId('delete-btn'));

    fireEvent.click(screen.getByRole('button', { name: /no/i }));
    expect(
      screen.queryByRole('button', { name: /yes/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /no/i }),
    ).not.toBeInTheDocument();
  });

  it('toggles edit mode correctly', () => {
    render(<AppointmentDetails appointment={mockedAppointment} />);
    fireEvent.click(screen.getByTestId('edit-btn'));
    expect(
      screen.getByRole('heading', { name: /edit appointment/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('mocked-edit-appointment-form'),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(
      screen.getByRole('heading', { name: /appointment details/i }),
    ).toBeInTheDocument();
  });
});
