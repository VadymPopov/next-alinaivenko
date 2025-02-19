import { SignInForm } from '@/components/admin';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignInResponse, signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('SignInForm component', () => {
  it('renders component correctly', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign In/i }),
    ).toBeInTheDocument();
  });

  it('submits filled form', async () => {
    render(<SignInForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Test123@');

    const btn = screen.getByRole('button', { name: /sign In/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'johndoe@mail.com',
        password: 'Test123@',
        redirect: false,
      });
    });
  });

  it('displays validation errors for empty fields', async () => {
    render(<SignInForm />);

    const btn = screen.getByRole('button', { name: /sign in/i });

    await userEvent.click(btn);

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('removes validation errors when fields are corrected', async () => {
    render(<SignInForm />);

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Test123@');

    await waitFor(() => {
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/password is required/i),
      ).not.toBeInTheDocument();
    });
  });

  it('disables submit button if form has validation errors', async () => {
    render(<SignInForm />);

    const btn = screen.getByRole('button', { name: /sign in/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Test123@');

    expect(btn).toBeEnabled();
  });

  it('displays error message if form submission fails', async () => {
    const mockSignIn = jest.mocked(signIn);
    mockSignIn.mockResolvedValue({
      error: 'error',
    } satisfies Partial<SignInResponse> as SignInResponse);

    render(<SignInForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'johndoe@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Test123@');

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Invalid email or password. Please try again.'),
      ).toBeInTheDocument();
    });
  });
});
