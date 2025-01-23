import { Modal } from '@/components/ui';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Modal component', () => {
  it('renders correctly when `show` is true', () => {
    render(
      <Modal show={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('calls `onClose` when the close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal show={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const button = screen.getByLabelText('close modal');
    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
