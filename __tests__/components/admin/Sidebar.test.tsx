import { Sidebar } from '@/components/admin';
import { useSidebar } from '@/providers/SidebarContext';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('@/components/admin/SidebarHeader', () => ({
  __esModule: true,
  SidebarHeader: () => (
    <div data-testid="mocked-appointment-view">Mocked SidebarHeader</div>
  ),
}));

jest.mock('@/components/admin/SidebarList', () => ({
  __esModule: true,
  SidebarList: () => (
    <div data-testid="mocked-appointment-view">Mocked SidebarList</div>
  ),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

describe('Sidebar component', () => {
  let mockPush: jest.Mock;
  let mockToogleSidebar: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockToogleSidebar = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSidebar as jest.Mock).mockReturnValue({
      isExtended: false,
      toggleSidebar: mockToogleSidebar,
    });
  });

  it('renders correctly', () => {
    render(<Sidebar />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(screen.getByText('Mocked SidebarHeader')).toBeInTheDocument();
    expect(screen.getByText('Mocked SidebarList')).toBeInTheDocument();
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  it('applies correct sidebar width based on isExtended state', () => {
    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: true });
    const { rerender } = render(<Sidebar />);

    const asideElement = screen.getByRole('complementary');

    expect(asideElement).toHaveClass('w-64');

    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: false });
    rerender(<Sidebar />);

    expect(asideElement).toHaveClass('w-16');
  });
});
