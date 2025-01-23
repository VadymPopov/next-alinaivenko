import { ServiceLabel, ServiceLabelProps } from '@/components/ui/ServiceLabel';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('ServiceLabel component', () => {
  const renderComponent = (service: ServiceLabelProps['service']) => {
    render(<ServiceLabel service={service} />);
  };

  it('renders "Small Tattoo" with correct styles', () => {
    renderComponent('Small Tattoo');
    const label = screen.getByText('Small Tattoo');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-[#2D6A4F] bg-[#D8F3DC]');
  });

  it('renders "Large Tattoo" with correct styles', () => {
    renderComponent('Large Tattoo');
    const label = screen.getByText('Large Tattoo');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-[#A4161A] bg-[#FFD6D9]');
  });

  it('renders "Touch-up" with correct styles', () => {
    renderComponent('Touch-up');
    const label = screen.getByText('Touch-up');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-[#FF6700] bg-[#FFE5CC]');
  });

  it('renders "Permanent Makeup" with correct styles', () => {
    renderComponent('Permanent Makeup');
    const label = screen.getByText('Permanent Makeup');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-[#0077B6] bg-[#D0EFFF]');
  });

  it('does not render invalid service text or apply styles', () => {
    // @ts-expect-error: Simulate invalid prop to ensure graceful handling
    render(<ServiceLabel service="Invalid Service" />);
    expect(screen.queryByText('Invalid Service')).not.toBeInTheDocument();
  });
});
