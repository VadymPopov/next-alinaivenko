import { SidebarItem } from '@/components/admin';
import { useSidebar } from '@/providers/SidebarContext';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

describe('SidebarItem component', () => {
  it('renders correctly when isExtended is false', () => {
    (useSidebar as jest.Mock).mockReturnValue({
      isExtended: false,
    });

    render(
      <SidebarItem current={true} pathname={'/test-path'}>
        <p>test text</p>
      </SidebarItem>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/test-path');
    expect(screen.getByRole('link')).toHaveClass('gap-0 justify-center');
    expect(screen.getByText('test text')).toBeInTheDocument();
  });

  it('renders correctly when isExtended is true ', () => {
    (useSidebar as jest.Mock).mockReturnValue({
      isExtended: true,
    });

    render(
      <SidebarItem current={false} pathname={'/test-path'}>
        <p>test text</p>
      </SidebarItem>,
    );

    expect(screen.getByRole('link')).toHaveClass('gap-3.5 mx-1');
  });

  it('renders correctly when current is false', () => {
    (useSidebar as jest.Mock).mockReturnValue({ isExtended: true });

    render(
      <SidebarItem current={false} pathname={'/test-path'}>
        <p>test text</p>
      </SidebarItem>,
    );

    expect(screen.getByRole('link')).not.toHaveClass(
      'after:border-2 after:border-accentColor',
    );
    expect(screen.getByRole('link')).not.toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
