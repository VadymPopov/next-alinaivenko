import { DatePickerField } from '@/components/ui';

import { useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DatePickerField Component', () => {
  const MockedDatePicker = (props: {
    label?: string;
    error?: string;
    minDate?: Date;
    maxDate?: Date;
    bday: boolean;
    admin?: boolean;
  }) => {
    const form = useForm();
    return <DatePickerField {...props} control={form.control} name="date" />;
  };

  it('renders DatePicker with label', () => {
    render(<MockedDatePicker label="Select Date" bday={false} />);

    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    render(
      <MockedDatePicker
        bday={false}
        label="Select Date"
        error="Date is required"
      />,
    );

    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-error');
  });

  it('renders checkmark if valid date is selected', async () => {
    render(
      <MockedDatePicker
        label="Select Date"
        minDate={new Date('2025-01-01')}
        maxDate={new Date('2025-01-31')}
        bday={false}
      />,
    );

    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.click(screen.getByText('15'));
    expect(screen.getByLabelText('Valid input')).toBeInTheDocument();
    expect(screen.getByDisplayValue('15/01/2025')).toBeInTheDocument();
  });

  it('does not display checkmark if there is an error', async () => {
    render(
      <MockedDatePicker
        label="Select Date"
        minDate={new Date('2025-01-01')}
        maxDate={new Date('2025-01-31')}
        bday={false}
        error="Invalid date"
      />,
    );

    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.click(screen.getByText('15'));

    expect(screen.getByText('Invalid date')).toBeInTheDocument();

    expect(screen.queryByLabelText('Valid input')).not.toBeInTheDocument();
  });

  it('shows year dropdown when bday prop is true', async () => {
    render(
      <MockedDatePicker
        label="Select Date"
        bday={true}
        minDate={new Date('2025-01-01')}
        maxDate={new Date('2025-01-31')}
      />,
    );

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('does not show year dropdown when bday prop is false', async () => {
    render(
      <MockedDatePicker
        label="Select Date"
        bday={false}
        minDate={new Date('2025-01-01')}
        maxDate={new Date('2025-01-31')}
      />,
    );

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.queryByText('2025')).not.toBeInTheDocument();
  });
});
