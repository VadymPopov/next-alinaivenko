import { SidebarList } from '@/components/admin';
import { SIDEBAR_MENU } from '@/constants';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/admin/SidebarItem', () => ({
  __esModule: true,
  SidebarItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-sidebar-item">{children}</div>
  ),
}));

describe('SidebarList component', () => {
  it('renders correctly when isExtended is true', () => {
    render(<SidebarList pathname={'/test-path'} isExtended={true} />);

    SIDEBAR_MENU.map((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('renders correctly when isExtended is false', () => {
    render(<SidebarList pathname="/test-path" isExtended={false} />);

    SIDEBAR_MENU.forEach((item) => {
      expect(screen.queryByText(item.label)).not.toBeInTheDocument();
    });

    expect(screen.getAllByTestId('mocked-sidebar-item')).toHaveLength(
      SIDEBAR_MENU.length,
    );
  });
});
