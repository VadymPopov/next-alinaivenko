import { mockedBlockedDates } from '@/__mocks__/mockData';
import { CalendarPicker } from '@/components/site';
import { MaxDate } from '@/types';

import { useForm } from 'react-hook-form';

import { fireEvent, render, screen } from '@testing-library/react';

describe('CalendarPicker Component', () => {
  const mockToday = new Date('2025-02-10T05:00:00.000Z');

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockToday);
  });

  const MockedCalendarPicker = (props: {
    error?: string;
    maxDate?: MaxDate;
    blockedDates: string[];
  }) => {
    const form = useForm();
    return <CalendarPicker {...props} control={form.control} name="date" />;
  };

  it('displays an error message when there is an error', () => {
    render(<MockedCalendarPicker blockedDates={[]} error="Date is required" />);

    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('does not display an error message when there is no error', () => {
    render(<MockedCalendarPicker blockedDates={[]} />);
    expect(screen.queryByText('Date is required')).not.toBeInTheDocument();
  });

  it('filters out blocked dates from selection', () => {
    render(<MockedCalendarPicker blockedDates={mockedBlockedDates} />);

    const dateInput = screen.getByRole('listbox');
    fireEvent.click(dateInput);

    mockedBlockedDates.forEach((blockedDate) => {
      const blockedDateElement = screen.queryByText(
        new Date(blockedDate).getDate(),
      );
      expect(blockedDateElement).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
