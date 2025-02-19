import { MainContent } from '@/components/admin';
import { useSidebar } from '@/providers/SidebarContext';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@/providers/SidebarContext', () => ({
  useSidebar: jest.fn(),
}));

const MockedMain = () => {
  return (
    <MainContent>
      <p>Test children in main</p>
    </MainContent>
  );
};

describe('MainContent component', () => {
  it('renders children correctly', () => {
    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: false });
    render(<MockedMain />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Test children in main')).toBeInTheDocument();
  });

  it('applies correct main width based on isExtended state', () => {
    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: true });
    const { rerender } = render(<MockedMain />);

    expect(screen.getByRole('main')).toHaveClass('md:ml-64');

    (useSidebar as jest.Mock).mockReturnValueOnce({ isExtended: false });
    rerender(<MockedMain />);

    expect(screen.getByRole('main')).toHaveClass('md:ml-16');
  });
});
