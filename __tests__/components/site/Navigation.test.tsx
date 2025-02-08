import { Navigation } from '@/components/site';
import { useMenu } from '@/hooks';

import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/hooks', () => ({
  useMenu: jest.fn(),
}));

describe('Navigation component', () => {
  let mockToggleMenu: jest.Mock;
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockToggleMenu = jest.fn();
    mockOnClose = jest.fn();

    (useMenu as jest.Mock).mockReturnValue({
      isOpen: false,
      toggleMenu: mockToggleMenu,
      onClose: mockOnClose,
    });
  });

  it('renders navigation correctly', () => {
    render(<Navigation />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('calls onClose when clicking the logo', () => {
    render(<Navigation />);

    fireEvent.click(screen.getByAltText('logo'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('toggles menu when clicking the BurgerBtn', () => {
    render(<Navigation />);
    const btn = screen.getByRole('button', { name: /menu/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(btn);
    expect(mockToggleMenu).toHaveBeenCalled();
  });
});
