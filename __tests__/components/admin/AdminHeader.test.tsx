import { Header } from '@/components/admin';
import { ADMIN_MENU } from '@/constants';
import { useMenu } from '@/hooks';
import { useSidebar } from '@/providers/SidebarContext';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useMenu: jest.fn(),
}));

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

describe('Header component', () => {
  let mockPush: jest.Mock;
  let mockToogleMenu: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockToogleMenu = jest.fn();
    (usePathname as jest.Mock).mockReturnValue('/admin/test');

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useMenu as jest.Mock).mockReturnValue({
      isOpen: false,
      toggleMenu: mockToogleMenu,
    });

    (useSidebar as jest.Mock).mockReturnValue({
      isExtended: false,
    });

    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          role: 'admin',
          id: '123456789',
          provider: 'google',
          email: 'test@mail.com',
        },
      },
    });
  });

  it('renders correctly', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', {
        name: 'Test',
        level: 1,
      }),
    ).toBeInTheDocument();

    ADMIN_MENU.map((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });

    expect(screen.getByAltText('profile picture')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('test@mail.com')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-icon')).toBeVisible();
  });

  it('shows pathname correctly when it has been changed', () => {
    const { rerender } = render(<Header />);

    expect(
      screen.getByRole('heading', { name: 'Test', level: 1 }),
    ).toBeInTheDocument();

    (usePathname as jest.Mock).mockReturnValue('/admin');
    rerender(<Header />);
    expect(
      screen.getByRole('heading', { name: 'Admin', level: 1 }),
    ).toBeInTheDocument();

    (usePathname as jest.Mock).mockReturnValue('/admin/dashboard');
    rerender(<Header />);
    expect(
      screen.getByRole('heading', { name: 'Dashboard', level: 1 }),
    ).toBeInTheDocument();

    (usePathname as jest.Mock).mockReturnValue('/admin/calendar');
    rerender(<Header />);
    expect(
      screen.getByRole('heading', { name: 'Calendar', level: 1 }),
    ).toBeInTheDocument();
  });

  it('navigates to profile page when profile image is clicked', () => {
    render(<Header />);

    const profileImage = screen.getByAltText('profile picture');
    profileImage.click();

    expect(mockPush).toHaveBeenCalledWith('/admin/profile', { scroll: false });
  });

  it('applies correct sidebar width based on isExtended state', () => {
    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: true });
    const { rerender } = render(<Header />);

    expect(screen.getByRole('banner')).toHaveClass('md:left-64');

    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: false });
    rerender(<Header />);

    expect(screen.getByRole('banner')).toHaveClass('md:left-16');
  });
});
