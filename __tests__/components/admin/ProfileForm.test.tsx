import { ProfileForm } from '@/components/admin';
import { postFetcher } from '@/lib/axiosFetchers';

import toast from 'react-hot-toast';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/axiosFetchers', () => ({
  postFetcher: jest.fn(),
}));

describe('ProfileForm component', () => {
  let mockBack: jest.Mock;

  beforeEach(() => {
    mockBack = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  it('renders component correctly', () => {
    render(<ProfileForm />);
    expect(
      screen.getByRole('heading', { name: 'Change Password:', level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('submits filled form and navigates ', async () => {
    render(<ProfileForm id="test-id-1" />);

    await userEvent.type(screen.getByLabelText('Password'), 'Test123456@');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Test123456@',
    );

    const btn = screen.getByRole('button', { name: /update/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(postFetcher).toHaveBeenCalledWith('/api/users?id=test-id-1', {
        password: 'Test123456@',
      });
    });

    expect(mockBack).toHaveBeenCalled();
  });

  it('shows an error if no user id provided', async () => {
    render(<ProfileForm />);

    await userEvent.type(screen.getByLabelText('Password'), 'Test123456@');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Test123456@',
    );

    const btn = screen.getByRole('button', { name: /update/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(postFetcher).not.toHaveBeenCalled();
    });

    expect(mockBack).not.toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith(
      'User ID is missing. Cannot update password.',
    );
  });

  it('displays validation errors for empty fields', async () => {
    render(<ProfileForm id="test-id-1" />);

    const btn = screen.getByRole('button', { name: /update/i });

    await userEvent.click(btn);

    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(
      screen.getByText('Confirm Password is required'),
    ).toBeInTheDocument();
  });

  it('removes validation errors when fields are corrected', async () => {
    render(<ProfileForm />);

    await userEvent.click(screen.getByRole('button', { name: /update/i }));

    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(
      screen.getByText('Confirm Password is required'),
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Password'), 'Test123456@');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Test123456@',
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Password is required'),
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Confirm Password is required'),
      ).not.toBeInTheDocument();
    });
  });

  it('disables submit button if form has validation errors', async () => {
    render(<ProfileForm />);

    const btn = screen.getByRole('button', { name: /update/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText('Password'), 'Test123456@');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Test123456@',
    );

    expect(btn).toBeEnabled();
  });

  it('displays error message if form submission fails', async () => {
    const mockPostFetcher = jest.mocked(postFetcher);
    mockPostFetcher.mockRejectedValue(new Error('Server error'));
    render(<ProfileForm id="test-id-1" />);

    await userEvent.type(screen.getByLabelText('Password'), 'Test123456@');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Test123456@',
    );
    await userEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });

  it('shows correct password strength and color', async () => {
    render(<ProfileForm />);

    await userEvent.type(screen.getByLabelText('Password'), 'test123');

    expect(screen.getByText('Weak')).toBeInTheDocument();
    expect(screen.getByText('Weak')).toHaveStyle({ color: 'red' });

    await userEvent.type(screen.getByLabelText('Password'), 'test123456');

    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toHaveStyle({ color: 'orange' });

    await userEvent.type(screen.getByLabelText('Password'), 'test123456@');

    expect(screen.getByText('Strong')).toBeInTheDocument();
    expect(screen.getByText('Strong')).toHaveStyle({ color: 'blue' });

    await userEvent.type(screen.getByLabelText('Password'), 'Test123456@');

    expect(screen.getByText('Very Strong')).toBeInTheDocument();
    expect(screen.getByText('Very Strong')).toHaveStyle({ color: 'green' });
  });
});
