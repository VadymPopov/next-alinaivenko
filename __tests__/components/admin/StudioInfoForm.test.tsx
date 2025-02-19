import { StudioInfoForm } from '@/components/admin';
import { useStudioInfo } from '@/hooks';

import toast from 'react-hot-toast';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedStudioInfo = {
  _id: 'test-id-1',
  address: '123 Test road',
  city: 'Odesa',
  name: 'Tattoo Test Studio',
  latitude: '12.3456',
  longitude: '45.6123',
};

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useStudioInfo: jest.fn(),
}));

describe('StudioInfoForm component', () => {
  let mockUpdateStudioInfo: jest.Mock;

  beforeEach(() => {
    mockUpdateStudioInfo = jest.fn();

    (useStudioInfo as jest.Mock).mockReturnValue({
      updateStudioInfo: mockUpdateStudioInfo,
      isValidating: false,
      isLoading: false,
      error: false,
      data: mockedStudioInfo,
    });
  });

  it('renders component correctly', () => {
    render(<StudioInfoForm studio={mockedStudioInfo} />);
    expect(
      screen.getByRole('heading', { name: 'Studio Address', level: 2 }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/studio name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/map latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/map longitude/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /set/i })).toBeInTheDocument();
  });

  it('pre-fills form fields with values', async () => {
    render(<StudioInfoForm studio={mockedStudioInfo} />);

    expect(screen.getByLabelText(/studio name/i)).toHaveValue(
      'Tattoo Test Studio',
    );
    expect(screen.getByLabelText(/city/i)).toHaveValue('Odesa');
    expect(screen.getByLabelText(/address/i)).toHaveValue('123 Test road');
    expect(screen.getByLabelText(/map latitude/i)).toHaveValue('12.3456');
    expect(screen.getByLabelText(/map longitude/i)).toHaveValue('45.6123');
  });

  it('submits filled form and navigates ', async () => {
    render(<StudioInfoForm studio={mockedStudioInfo} />);

    const name = screen.getByLabelText(/studio name/i);
    const city = screen.getByLabelText(/city/i);
    const address = screen.getByLabelText(/address/i);
    const latitude = screen.getByLabelText(/map latitude/i);
    const longitude = screen.getByLabelText(/map longitude/i);
    await userEvent.clear(name);
    await userEvent.type(name, 'John Doe Studio');
    await userEvent.clear(city);
    await userEvent.type(city, 'Test City');
    await userEvent.clear(address);
    await userEvent.type(address, '456 Test Town');
    await userEvent.clear(latitude);
    await userEvent.type(latitude, '78.9456');
    await userEvent.clear(longitude);
    await userEvent.type(longitude, '45.6789');

    const btn = screen.getByRole('button', { name: /set/i });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(mockUpdateStudioInfo).toHaveBeenCalledWith({
        id: 'test-id-1',
        address: '456 Test Town',
        city: 'Test City',
        name: 'John Doe Studio',
        latitude: '78.9456',
        longitude: '45.6789',
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Studio Information was successfully updated!',
        expect.any(Object),
      );
    });
  });

  it('displays validation errors for empty fields', async () => {
    render(<StudioInfoForm studio={mockedStudioInfo} />);

    const name = screen.getByLabelText(/studio name/i);
    const city = screen.getByLabelText(/city/i);
    const address = screen.getByLabelText(/address/i);
    const latitude = screen.getByLabelText(/map latitude/i);
    const longitude = screen.getByLabelText(/map longitude/i);
    await userEvent.clear(name);
    await userEvent.clear(city);
    await userEvent.clear(address);
    await userEvent.clear(latitude);
    await userEvent.clear(longitude);

    const btn = screen.getByRole('button', { name: /set/i });

    await userEvent.click(btn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/city is required/i)).toBeInTheDocument();
    expect(screen.getByText(/address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/longitude is required/i)).toBeInTheDocument();
    expect(screen.getByText(/latitude is required/i)).toBeInTheDocument();
  });

  it('disables submit button if form has validation errors', async () => {
    render(<StudioInfoForm studio={mockedStudioInfo} />);

    await userEvent.clear(screen.getByLabelText(/studio name/i));

    const btn = screen.getByRole('button', { name: /set/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/studio name/i), 'Studio Name');

    expect(btn).toBeEnabled();
  });

  it('disables submit button if form data has not changed', async () => {
    render(<StudioInfoForm studio={mockedStudioInfo} />);

    const btn = screen.getByRole('button', { name: /set/i });

    await userEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('displays error message if form submission fails', async () => {
    mockUpdateStudioInfo.mockRejectedValue(new Error('Server error'));
    render(<StudioInfoForm studio={mockedStudioInfo} />);

    const city = screen.getByLabelText(/city/i);
    await userEvent.clear(city);
    await userEvent.type(city, 'Test City');

    await userEvent.click(screen.getByRole('button', { name: /set/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });
});
