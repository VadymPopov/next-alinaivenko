import { ProcessSteps } from '@/components/site';
import { BOOKING_LINKS, PAYMENT_LINKS } from '@/constants';

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('ProcessSteps component', () => {
  it('renders component correctly', () => {
    render(<ProcessSteps links={BOOKING_LINKS} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);

    BOOKING_LINKS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders active link correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/payment/tip-amount');
    render(<ProcessSteps links={PAYMENT_LINKS} />);

    const activeLink = screen.getByText(PAYMENT_LINKS[1].label);
    const unactiveLink = screen.getByText(PAYMENT_LINKS[0].label);
    expect(activeLink).toHaveClass('text-accentColor hover:text-accentColor');
    expect(unactiveLink).toHaveClass(
      'text-textColorDarkBg hover:text-cardColor',
    );
  });

  it('renders arrows between links except for the last one', () => {
    render(<ProcessSteps links={PAYMENT_LINKS} />);

    expect(screen.getAllByTestId('arrow-icon')).toHaveLength(2);
  });
});
