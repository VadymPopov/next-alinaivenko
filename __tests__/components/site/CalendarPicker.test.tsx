import { CalendarPicker } from '@/components/site';
import { MaxDate } from '@/types';

import { useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CalendarPicker Component', () => {
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

  it('filters out blocked dates from selection', async () => {
    const today = new Date();
    const blockedDates = [
      new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0],
      new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0],
    ];

    render(<MockedCalendarPicker blockedDates={blockedDates} />);

    const dateInput = screen.getByRole('listbox');
    await userEvent.click(dateInput);

    blockedDates.forEach((blockedDate) => {
      const blockedDateElement = screen.queryAllByText(
        new Date(blockedDate).getDate(),
      );
      expect(blockedDateElement[0]).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
