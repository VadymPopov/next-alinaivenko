import { mockedAppointment, serviceStyles } from '@/__mocks__/mockData';
import { WeekViewAppointment } from '@/components/admin';
import { useSidebar } from '@/providers/SidebarContext';
import { convertToTimeRange } from '@/utils';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

describe('WeekViewAppointment component', () => {
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
    render(<WeekViewAppointment appointment={mockedAppointment} />);

    expect(screen.getByText(mockedAppointment.name)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.service)).toBeInTheDocument();
    expect(
      screen.getByText(
        convertToTimeRange(mockedAppointment.slot, mockedAppointment.duration),
      ),
    ).toBeInTheDocument();
  });

  serviceStyles.forEach(({ service, expectedClass }) => {
    it(`applies correct styles for service type: ${service}`, () => {
      render(
        <WeekViewAppointment appointment={{ ...mockedAppointment, service }} />,
      );

      const div = screen.getByTestId('appt-container');
      expect(div).toHaveClass(expectedClass);
    });
  });

  it('changes text size when isExtended is toggled', () => {
    (useSidebar as jest.Mock).mockReturnValue({
      isExtended: true,
    });
    const { rerender } = render(
      <WeekViewAppointment appointment={mockedAppointment} />,
    );

    const paragraph = screen.getByText(mockedAppointment.name);

    expect(paragraph).toHaveClass('text-xs');

    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: false });
    rerender(<WeekViewAppointment appointment={mockedAppointment} />);

    expect(paragraph).toHaveClass('text-sm');
  });

  it('applies styles when className and style prop are provided', () => {
    render(
      <WeekViewAppointment
        appointment={mockedAppointment}
        className="bg-error p-10"
        style={{ height: '100px', top: '25px' }}
      />,
    );

    const div = screen.getByTestId('appt-container');

    expect(div).toHaveClass('bg-error p-10');
    expect(div).toHaveStyle({ height: '100px', top: '25px' });
  });

  it('navigates to the correct appointment page when clicked', () => {
    render(<WeekViewAppointment appointment={mockedAppointment} />);

    const div = screen.getByTestId('appt-container');
    fireEvent.click(div);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/admin/appointments/testid-1');
  });
});
