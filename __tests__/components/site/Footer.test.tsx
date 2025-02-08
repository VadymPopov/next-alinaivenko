import { Footer } from '@/components/site';

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Footer component', () => {
  it('renders component correctly', () => {
    render(<Footer />);

    expect(screen.getByText(/developed by/i)).toBeInTheDocument();

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks).toHaveLength(2);

    expect(
      screen.getByRole('link', { name: /tiktok-page/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /instagram-page/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/© 2023/i)).toBeInTheDocument();
  });

  it('applies correct class when pathname is waiverform', () => {
    (usePathname as jest.Mock).mockReturnValue('/waiverform');
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');

    expect(footer).toHaveClass('pb-[60px]');
    expect(footer).not.toHaveClass('py-3  lg:py-4  xl:py-5');
  });

  it('displays the correct current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();

    expect(
      screen.getByText(new RegExp(`© 2023-${year}`, 'i')),
    ).toBeInTheDocument();
  });
});
