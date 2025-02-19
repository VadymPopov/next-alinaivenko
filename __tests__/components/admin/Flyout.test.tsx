import { mockedAppointments } from '@/__tests__/mocks/mockData';
import { Flyout } from '@/components/admin';
import { useSidebar } from '@/providers/SidebarContext';
import { downloadCSV, generateCSV } from '@/utils';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/utils', () => ({
  generateCSV: jest.fn(),
  downloadCSV: jest.fn(),
}));

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

describe('Flyout component', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSidebar as jest.Mock).mockReturnValue({
      isExtended: false,
    });
  });

  it('renders correctly', () => {
    render(<Flyout appointments={mockedAppointments} date={{ year: 2025 }} />);

    expect(
      screen.getByRole('button', {
        name: 'Download',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Add Appointment',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/3 appointments selected/i)).toBeInTheDocument();
  });

  it('hides download btn and shows proper message when appt array is empty', () => {
    render(<Flyout appointments={[]} date={{ year: 2025 }} />);

    expect(
      screen.queryByRole('button', {
        name: 'Download',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Add Appointment',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/0 appointments selected/i)).toBeInTheDocument();
  });
  it('navigates to profile page when profile image is clicked', () => {
    render(<Flyout appointments={mockedAppointments} date={{ year: 2025 }} />);

    const addBtn = screen.getByRole('button', {
      name: 'Add Appointment',
    });
    addBtn.click();

    expect(mockPush).toHaveBeenCalledWith('/admin/appointments/add', {
      scroll: false,
    });
  });

  it('prepares and donloads csv when btn is clicked', () => {
    render(<Flyout appointments={mockedAppointments} date={{ year: 2025 }} />);

    const btn = screen.getByRole('button', {
      name: 'Download',
    });
    btn.click();

    expect(generateCSV).toHaveBeenCalledWith(mockedAppointments);
    expect(downloadCSV).toHaveBeenCalled();
  });

  it('applies correct styles width based on isExtended state', () => {
    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: true });
    const { rerender } = render(
      <Flyout appointments={mockedAppointments} date={{ year: 2025 }} />,
    );

    expect(screen.getByTestId('flyout-container')).toHaveClass('md:left-64');

    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: false });
    rerender(
      <Flyout appointments={mockedAppointments} date={{ year: 2025 }} />,
    );

    expect(screen.getByTestId('flyout-container')).toHaveClass('md:left-16');
  });
});
