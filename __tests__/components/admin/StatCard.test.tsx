import { StatCard } from '@/components/admin';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('StatCard component', () => {
  it('renders correctly', () => {
    render(<StatCard label="Test" counter={10} isCurrency={false} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders correctly when isCurrency is true', () => {
    render(<StatCard label="Test" counter={10} isCurrency={true} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('CA$10.00')).toBeInTheDocument();
  });
});
