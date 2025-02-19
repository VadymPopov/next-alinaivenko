import { SidebarHeader } from '@/components/admin';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

describe('SidebarHeader component', () => {
  const mockToggleSidebar = jest.fn();
  const mockOnLogoClick = jest.fn();

  it('renders correctly', () => {
    render(
      <SidebarHeader
        isExtended={false}
        toggleSidebar={mockToggleSidebar}
        onLogoClick={mockOnLogoClick}
      />,
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByTestId('extended-menu-close')).toBeInTheDocument();
  });

  it('applies correct sidebar width based on isExtended state', () => {
    const { rerender } = render(
      <SidebarHeader
        isExtended={true}
        toggleSidebar={mockToggleSidebar}
        onLogoClick={mockOnLogoClick}
      />,
    );

    expect(screen.getByTestId('extended-menu-open')).toBeInTheDocument();

    const img = screen.getByAltText('logo');

    expect(img).toHaveClass('my-11 mx-auto rounded-full cursor-pointer');

    rerender(
      <SidebarHeader
        isExtended={false}
        toggleSidebar={mockToggleSidebar}
        onLogoClick={mockOnLogoClick}
      />,
    );

    expect(img).toHaveClass('w-12 h-12');

    expect(screen.getByTestId('extended-menu-close')).toBeInTheDocument();
  });
});
