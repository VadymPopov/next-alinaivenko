import { Menu } from '@/components/ui';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockedMenu = [
  {
    path: '/path-one',
    label: 'path-one',
  },
  {
    path: '/path-two',
    label: 'path-two',
  },
  {
    path: '/path-three',
    label: 'path-three',
  },
];

describe('Menu component', () => {
  it('renders Menu component correctly', () => {
    render(<Menu menu={mockedMenu} />);
    const listItems = screen.getAllByRole('listitem');
    const links = screen.getAllByRole('link');

    expect(listItems.length).toBe(3);
    expect(links[0]).toHaveTextContent('path-one');
    expect(links[1]).toHaveTextContent('path-two');
    expect(links[2]).toHaveTextContent('path-three');
  });

  it('calls onClick on item click', () => {
    const mockOnClick = jest.fn();
    render(<Menu menu={mockedMenu} onClick={mockOnClick} />);

    const listItems = screen.getAllByRole('listitem');
    fireEvent.click(listItems[0]);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly without onClick handler', () => {
    render(<Menu menu={mockedMenu} />);
    const listItems = screen.getAllByRole('listitem');

    fireEvent.click(listItems[0]);
    expect(listItems.length).toBe(3);
  });

  it('applies correct styles to active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/path-two');
    render(<Menu menu={mockedMenu} />);
    const activeLink = screen.getByRole('link', { name: 'path-two' });
    expect(activeLink).toHaveClass('text-accentColor');
  });

  it('applies correct styles to non-active links', () => {
    (usePathname as jest.Mock).mockReturnValue('/path-one');
    render(<Menu menu={mockedMenu} />);

    const nonActiveLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') !== '/path-one');

    nonActiveLinks.forEach((link) => {
      expect(link).toHaveClass('text-mainLightColor lg:text-cardColor');
    });
  });

  it('renders without items when menu is empty', () => {
    render(<Menu menu={[]} />);
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(0);
  });

  it('updates active link on pathname change', () => {
    const { rerender } = render(<Menu menu={mockedMenu} />);
    (usePathname as jest.Mock).mockReturnValue('/path-one');

    rerender(<Menu menu={mockedMenu} />);
    const activeLink = screen.getByRole('link', { name: 'path-one' });
    expect(activeLink).toHaveClass('text-accentColor');

    (usePathname as jest.Mock).mockReturnValue('/path-three');
    rerender(<Menu menu={mockedMenu} />);
    const newActiveLink = screen.getByRole('link', { name: 'path-three' });
    expect(newActiveLink).toHaveClass('text-accentColor');
  });

  it('applies conditional classes correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/path-one');
    render(<Menu menu={mockedMenu} />);

    const activeLink = screen.getByRole('link', { name: 'path-one' });
    const nonActiveLink = screen.getByRole('link', { name: 'path-two' });

    expect(activeLink).toHaveClass('text-accentColor');
    expect(nonActiveLink).toHaveClass('text-mainLightColor');
  });
});
