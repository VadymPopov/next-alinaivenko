import { mockedAppointment } from '@/__tests__/mocks/mockData';
import { AppointmentRowView } from '@/components/admin';
import { serviceType } from '@/types';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AppointmentRowView component', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders correct appointment details', () => {
    render(<AppointmentRowView appointment={mockedAppointment} />);

    expect(screen.getByText(mockedAppointment.name)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.email)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.service)).toBeInTheDocument();
    expect(screen.getByText('10.02.2025')).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.slot)).toBeInTheDocument();
    expect(screen.getByText('1h')).toBeInTheDocument();
  });

  it('does not display Instagram when isNew is true', () => {
    render(<AppointmentRowView appointment={mockedAppointment} isNew={true} />);
    expect(
      screen.queryByText(mockedAppointment.instagram),
    ).not.toBeInTheDocument();
  });

  it('does not display duration when isNew is true', () => {
    render(<AppointmentRowView appointment={mockedAppointment} isNew={true} />);
    expect(screen.queryByText('1h')).not.toBeInTheDocument();
  });

  it('shows deposit amount when isNew is true', () => {
    render(<AppointmentRowView appointment={mockedAppointment} isNew={true} />);
    expect(screen.getByText('CA$100.00')).toBeInTheDocument();
  });

  it('does not show deposit amount when isNew is false', () => {
    render(<AppointmentRowView appointment={mockedAppointment} />);
    expect(screen.queryByText('CA$100.00')).not.toBeInTheDocument();
  });

  it('navigates to appointment details page on click', () => {
    render(<AppointmentRowView appointment={mockedAppointment} />);
    const card = screen.getByRole('row');
    fireEvent.click(card);
    expect(mockPush).toHaveBeenCalledWith('/admin/appointments/testid-1');
  });
});
