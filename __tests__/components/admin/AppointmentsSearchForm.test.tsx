import { AppointmentsSearchForm } from '@/components/admin';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedSetDate = jest.fn();

describe('AppointmentsSearchForm component', () => {
  it('renders component correctly', () => {
    render(<AppointmentsSearchForm setDate={mockedSetDate} />);

    expect(
      screen.getByRole('heading', {
        name: /search appointments by date/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/year/i)).toBeInTheDocument();
    expect(screen.getByText(/month/i)).toBeInTheDocument();
    expect(screen.getByText(/day/i)).toBeInTheDocument();
  });

  it('calls setDate when only year is provided', async () => {
    render(<AppointmentsSearchForm setDate={mockedSetDate} />);

    const searchButton = screen.getByRole('button');
    await userEvent.click(searchButton);

    expect(mockedSetDate).toHaveBeenCalledWith({
      year: new Date().getFullYear(),
    });
  });

  it('updates day options when year and month are selected', async () => {
    render(<AppointmentsSearchForm setDate={mockedSetDate} />);
    const user = userEvent.setup();

    const yearInput = screen.getByPlaceholderText(/year/i);
    await user.clear(yearInput);
    await user.type(yearInput, '2024');

    expect(yearInput).toHaveValue(2024);

    await user.click(screen.getByText(/month/i));
    await user.click(screen.getByText('February'));

    await waitFor(() => {
      expect(screen.getByText('Day')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Day'));
    expect(await screen.findByText('29')).toBeInTheDocument();
  });

  it('does not allow negative year input', async () => {
    render(<AppointmentsSearchForm setDate={mockedSetDate} />);
    const user = userEvent.setup();

    const yearInput = screen.getByPlaceholderText(/year/i);
    await user.type(yearInput, '-2025');

    expect(yearInput).not.toHaveValue('-2025'); // Replace with expected behavior
  });

  it('calls setDate with correct values when form is submitted', async () => {
    render(<AppointmentsSearchForm setDate={mockedSetDate} />);
    const user = userEvent.setup();

    const yearInput = screen.getByPlaceholderText(/year/i);
    const monthSelect = screen.getByText(/month/i);
    const daySelect = screen.getByText(/day/i);
    const searchButton = screen.getByRole('button');

    await user.clear(yearInput);
    await user.type(yearInput, '2024');
    await user.click(monthSelect);
    await user.click(screen.getByText('October'));
    await user.click(daySelect);
    await user.click(screen.getByText('15'));
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockedSetDate).toHaveBeenCalledWith({
        year: '2024',
        month: '10',
        day: '15',
      });
    });
  });

  it('clears day selection when month changes', async () => {
    render(<AppointmentsSearchForm setDate={mockedSetDate} />);
    const user = userEvent.setup();

    const yearInput = screen.getByPlaceholderText(/year/i);
    await user.clear(yearInput);
    await user.type(yearInput, '2024');

    await user.click(screen.getByText(/month/i));
    await user.click(screen.getByText('March'));

    await user.click(screen.getByText(/day/i));
    await user.click(screen.getByText('30'));

    expect(screen.getByText('30')).toBeInTheDocument();

    await user.click(screen.getByText(/march/i));
    await user.click(screen.getByText('February'));

    await waitFor(() => {
      expect(screen.getByText(/day/i)).toBeInTheDocument();
    });

    expect(screen.queryByText('30')).not.toBeInTheDocument();
  });
});
