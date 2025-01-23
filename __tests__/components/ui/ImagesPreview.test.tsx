import { ImagesPreview } from '@/components/ui';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

global.URL.createObjectURL = jest.fn(() => '/mock-url');

const mockedFiles = [
  new File(['file1'], 'image1.png', { type: 'image/png' }),
  new File(['file2'], 'image2.jpg', { type: 'image/jpeg' }),
];

describe('ImagesPreview component', () => {
  it('renders ImagesPreview component correctly', () => {
    render(
      <ImagesPreview selectedFiles={mockedFiles} handleDelete={() => {}} />,
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockedFiles.length);

    mockedFiles.forEach((_, index) => {
      const image = screen.getByAltText(`preview-${index}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        'src',
        '/_next/image?url=%2Fmock-url&w=256&q=75',
      );
    });
  });
  it('renders no images when selectedFiles is empty', () => {
    render(<ImagesPreview selectedFiles={[]} handleDelete={() => {}} />);
    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });

  it('calls handleDelete when delete button is clicked', () => {
    const mockHandleDelete = jest.fn();
    render(
      <ImagesPreview
        selectedFiles={mockedFiles}
        handleDelete={mockHandleDelete}
      />,
    );

    const deleteButtons = screen.getAllByRole('button');
    expect(deleteButtons).toHaveLength(mockedFiles.length);
    fireEvent.click(deleteButtons[0]);
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    expect(mockHandleDelete).toHaveBeenCalledWith(0);
  });
});
