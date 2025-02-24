import { mockedSlots } from '@/__mocks__/mockData';
import { SlotsPicker } from '@/components/site';
import { isTimeWithinLastHour } from '@/utils';

import { useForm } from 'react-hook-form';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('@/utils', () => ({
  isTimeWithinLastHour: jest.fn(),
}));

describe('SlotsPicker component', () => {
  const MockedSlotsPicker = (props: {
    error?: string;
    slots: string[];
    selectedDate: Date;
  }) => {
    const form = useForm();
    return <SlotsPicker {...props} control={form.control} name="slot" />;
  };

  it('renders component correctly', () => {
    render(<MockedSlotsPicker slots={mockedSlots} selectedDate={new Date()} />);

    mockedSlots.forEach((slot) => {
      expect(screen.getByText(slot)).toBeInTheDocument();
    });
  });

  it('shows message when slots are empty', () => {
    render(<MockedSlotsPicker slots={[]} selectedDate={new Date()} />);

    expect(
      screen.getByText('Sorry, there are no available times.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Please check another date.')).toBeInTheDocument();
  });

  it('adds active class on slot button click', async () => {
    (isTimeWithinLastHour as jest.Mock).mockReturnValue(false);

    render(<MockedSlotsPicker slots={mockedSlots} selectedDate={new Date()} />);

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);

    await waitFor(() => expect(buttons[0]).toHaveClass('bg-accentColor'));

    fireEvent.click(buttons[0]);

    await waitFor(() => expect(buttons[0]).toHaveClass('bg-cardColor'));
  });

  it('displays an error message when provided', () => {
    render(
      <MockedSlotsPicker
        slots={mockedSlots}
        selectedDate={new Date()}
        error="You must select a slot"
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'You must select a slot',
    );
  });

  it('disables slots that are within the last hour', () => {
    (isTimeWithinLastHour as jest.Mock).mockReturnValue(true);
    render(<MockedSlotsPicker slots={mockedSlots} selectedDate={new Date()} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
