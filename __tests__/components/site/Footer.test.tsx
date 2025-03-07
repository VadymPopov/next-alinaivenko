import { mockedStudio } from '@/__mocks__/mockData';
import { Footer } from '@/components/site';

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Footer component', () => {
  it('renders component correctly', () => {
    render(<Footer studio={mockedStudio} />);

    expect(screen.getByText(/developed by/i)).toBeInTheDocument();

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks).toHaveLength(2);

    expect(
      screen.getByRole('link', { name: /tiktok-page/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /instagram-page/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /email-page/i }),
    ).toBeInTheDocument();

    expect(screen.getByText('Mocked Tattoo Studio')).toBeInTheDocument();

    expect(screen.getByText(/© 2023/i)).toBeInTheDocument();
  });

  it('does not render footer when pathname is waiverform', () => {
    (usePathname as jest.Mock).mockReturnValue('/waiverform');
    render(<Footer studio={mockedStudio} />);
    const footer = screen.queryByRole('contentinfo');

    expect(footer).not.toBeInTheDocument();
  });

  it('does not render studio info when studio is null', () => {
    render(<Footer studio={null} />);
    expect(screen.queryByText(/mocked tattoo studio/i)).not.toBeInTheDocument();
  });
});
