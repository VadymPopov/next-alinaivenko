import { mockedAppointment } from '@/__tests__/mocks/mockData';
import { AppointmentCardView } from '@/components/admin';
import { serviceType } from '@/types';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AppointmentCardView component', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders correct appointment details', () => {
    render(<AppointmentCardView appointment={mockedAppointment} />);

    expect(screen.getByText(mockedAppointment.name)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.email)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.service)).toBeInTheDocument();
    expect(screen.getByText('10.02.2025')).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.slot)).toBeInTheDocument();
  });

  it('displays Instagram handle when isNew is false', () => {
    render(<AppointmentCardView appointment={mockedAppointment} />);
    expect(screen.getByText('@test')).toBeInTheDocument();
  });

  it('does not display Instagram handle when isNew is true', () => {
    render(
      <AppointmentCardView appointment={mockedAppointment} isNew={true} />,
    );
    expect(screen.queryByText('@test')).not.toBeInTheDocument();
  });

  it('shows duration when isNew is false', () => {
    render(<AppointmentCardView appointment={mockedAppointment} />);
    expect(screen.getByText('1h')).toBeInTheDocument();
  });

  it('does not show duration when isNew is true', () => {
    render(
      <AppointmentCardView appointment={mockedAppointment} isNew={true} />,
    );
    expect(screen.queryByText('1h')).not.toBeInTheDocument();
  });

  it('shows deposit amount when isNew is true', () => {
    render(
      <AppointmentCardView appointment={mockedAppointment} isNew={true} />,
    );
    expect(screen.getByText('CA$100.00')).toBeInTheDocument();
  });

  it('does not show deposit amount when isNew is false', () => {
    render(<AppointmentCardView appointment={mockedAppointment} />);
    expect(screen.queryByText('CA$100.00')).not.toBeInTheDocument();
  });

  it('navigates to appointment details page on click', () => {
    render(<AppointmentCardView appointment={mockedAppointment} />);
    const card = screen.getByTestId('appt-card');
    fireEvent.click(card);
    expect(mockPush).toHaveBeenCalledWith('/admin/appointments/testid-1');
  });
});
