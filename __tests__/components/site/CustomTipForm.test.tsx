import { CustomTipForm } from '@/components/site';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedSetTip = jest.fn();
const mockedSetShowCustomTipForm = jest.fn();

describe('CustomTipForm component', () => {
  it('renders component correctly', () => {
    render(
      <CustomTipForm
        setTip={mockedSetTip}
        showCustomTipForm={true}
        setShowCustomTipForm={mockedSetShowCustomTipForm}
      />,
    );

    expect(screen.getByText(/custom amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter amount/i)).toBeInTheDocument();
  });

  it('calls setTip and hides form when valid input is submitted', async () => {
    render(
      <CustomTipForm
        setTip={mockedSetTip}
        showCustomTipForm={true}
        setShowCustomTipForm={mockedSetShowCustomTipForm}
      />,
    );

    const btn = screen.getByRole('button');
    const input = screen.getByLabelText(/amount/i);
    await userEvent.type(input, '50');
    await userEvent.click(btn);

    expect(mockedSetTip).toHaveBeenCalledWith(50);
    expect(mockedSetShowCustomTipForm).toHaveBeenCalledWith(false);
  });

  it('disables submit button when input is invalid and enables when valid', async () => {
    render(
      <CustomTipForm
        setTip={mockedSetTip}
        showCustomTipForm={true}
        setShowCustomTipForm={mockedSetShowCustomTipForm}
      />,
    );

    const btn = screen.getByRole('button');
    const input = screen.getByLabelText(/amount/i);

    expect(btn).toBeDisabled();

    await userEvent.type(input, '50');

    expect(btn).toBeEnabled();

    await userEvent.clear(input);
    expect(btn).toBeDisabled();
  });

  it('does not render the form when showCustomTipForm is false', () => {
    render(
      <CustomTipForm
        setTip={mockedSetTip}
        showCustomTipForm={false}
        setShowCustomTipForm={mockedSetShowCustomTipForm}
      />,
    );

    expect(screen.queryByLabelText(/amount/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('displays validation error for zero or negative amount', async () => {
    render(
      <CustomTipForm
        setTip={mockedSetTip}
        showCustomTipForm={true}
        setShowCustomTipForm={mockedSetShowCustomTipForm}
      />,
    );

    const input = screen.getByLabelText(/amount/i);
    const btn = screen.getByRole('button');

    await userEvent.type(input, '-10');
    await userEvent.click(btn);

    expect(
      screen.getByText(/amount must be greater than zero/i),
    ).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, '0');
    await userEvent.click(btn);

    expect(
      screen.getByText(/amount must be greater than zero/i),
    ).toBeInTheDocument();
  });
});
