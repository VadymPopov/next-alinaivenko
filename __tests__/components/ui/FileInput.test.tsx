import { FileInput } from '@/components/ui';
import { useImageUpload } from '@/hooks';

import { useFormContext } from 'react-hook-form';

import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('react-hook-form');
jest.mock('@/hooks');

describe('InputField component', () => {
  const mockUseForm = jest.fn().mockReturnValue({
    register: jest.fn().mockReturnValue({}),
  });
  const mockUseImageUpload = jest.fn().mockReturnValue({
    selectedFiles: [],
    handleFileChange: jest.fn().mockReturnValue({}),
    handleDelete: jest.fn().mockReturnValue({}),
  });

  beforeEach(() => {
    (useFormContext as jest.Mock).mockImplementation(mockUseForm);
    (useImageUpload as jest.Mock).mockImplementation(mockUseImageUpload);
  });

  it('renders a file input field with correct attributes', () => {
    render(<FileInput label="Images" name="images" type="file" />);
    const input = screen.getByTestId('file-input');

    expect(screen.getByText('Images')).toBeInTheDocument();

    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('id', 'images');
  });

  it('triggers file change handler when a file is selected', () => {
    const mockHandleFileChange = jest.fn();
    (useImageUpload as jest.Mock).mockReturnValueOnce({
      ...mockUseImageUpload(),
      handleFileChange: mockHandleFileChange,
    });

    render(<FileInput label="Images" name="images" type="file" />);

    const input = screen.getByTestId('file-input');
    const file = new File(['test'], 'test-file.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockHandleFileChange).toHaveBeenCalledTimes(1);
  });

  it('renders an error message correctly with styles', () => {
    render(
      <FileInput
        label="Images"
        name="images"
        type="file"
        error={'Image is required'}
      />,
    );
    expect(screen.getByText('Image is required')).toBeInTheDocument();

    expect(screen.getByTestId('file-input-label')).toHaveClass('border-error');
  });

  it('shows optional text correctly', () => {
    render(<FileInput label="Images" name="images" type="file" optional />);

    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });
});
