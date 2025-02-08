import { ClientForm } from '@/components/site';
import { useAppContext } from '@/providers/AppContext';
import { getBase64 } from '@/utils';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

global.URL.createObjectURL = jest.fn(() => '/mock-url');

jest.mock('@/utils', () => ({
  getBase64: jest.fn().mockResolvedValue('mockBase64String'),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/AppContext', () => ({
  useAppContext: jest.fn(),
}));

describe('ClientForm component', () => {
  let mockSetAppointmentInfo: jest.Mock;
  let mockPush: jest.Mock;
  let mockReplace: jest.Mock;

  beforeEach(() => {
    mockSetAppointmentInfo = jest.fn();
    mockPush = jest.fn();
    mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });

    (useAppContext as jest.Mock).mockReturnValue({
      setAppointmentInfo: mockSetAppointmentInfo,
      appointmentInfo: null,
      service: 'Small Tattoo',
    });
  });

  it('redirects if no service is selected', () => {
    (useAppContext as jest.Mock).mockReturnValue({
      setAppointmentInfo: mockSetAppointmentInfo,
      appointmentInfo: {},
      service: null,
    });

    render(<ClientForm />);
    expect(mockReplace).toHaveBeenCalledWith('/booking');
  });

  it('renders component correctly', () => {
    render(<ClientForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /If you have a tattoo concept in mind or a rough sketch/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Add your tattoo idea/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('focuses on the name field on mount', () => {
    render(<ClientForm />);
    const nameInput = screen.getByLabelText(/full name/i);
    expect(nameInput).toHaveFocus();
  });

  it('disables submit button if form has validation errors', async () => {
    render(<ClientForm />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');

    expect(btn).toBeEnabled();
  });

  it('displays validation errors for empty fields', async () => {
    render(<ClientForm />);

    const btn = screen.getByRole('button', { name: /next/i });

    await userEvent.click(btn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('submits form and navigates to the next step', async () => {
    render(<ClientForm />);

    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');

    await userEvent.click(btn);

    expect(mockPush).toHaveBeenCalledWith(`/booking/schedule?duration=60`);
    expect(mockSetAppointmentInfo).toHaveBeenCalledWith({
      description: '',
      images: [],
      phone: '',
      instagram: '',
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('uploads images and converts them to base64', async () => {
    render(<ClientForm />);

    const fileInput = screen.getByTestId('file-input');
    const btn = screen.getByRole('button', { name: /next/i });
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');

    const files = [
      new File(['file content 1'], 'image1.png', { type: 'image/png' }),
      new File(['file content 2'], 'image2.png', { type: 'image/png' }),
    ];

    fireEvent.change(fileInput, { target: { files } });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(getBase64).toHaveBeenCalled();
    });
  });

  it('does not allow more than 3 images', async () => {
    render(<ClientForm />);
    const fileInput = screen.getByTestId('file-input');
    const files = [
      new File(['image content'], 'image1.png', { type: 'image/png' }),
      new File(['image content'], 'image2.png', { type: 'image/png' }),
      new File(['image content'], 'image3.png', { type: 'image/png' }),
      new File(['image content'], 'image4.png', { type: 'image/png' }),
    ];

    fireEvent.change(fileInput, { target: { files } });

    expect(
      await screen.findByText(/you can only upload up to 3 images/i),
    ).toBeInTheDocument();
  });
});
