import { SignOutBtn } from '@/components/ui';
import { useSidebar } from '@/providers/SidebarContext';

import { fireEvent, render, screen } from '@testing-library/react';
import { signOut } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

describe('SignOutBtn component', () => {
  it('renders correctly with icon and text when isExtended is true', () => {
    (useSidebar as jest.Mock).mockReturnValue({ isExtended: true });

    render(<SignOutBtn />);

    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders only icon when isExtended is false', () => {
    (useSidebar as jest.Mock).mockReturnValue({ isExtended: false });

    render(<SignOutBtn />);

    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  it('calls signOut when button is clicked', () => {
    render(<SignOutBtn />);

    fireEvent.click(screen.getByRole('button'));
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });
});
