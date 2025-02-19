import { AdminTitle } from '@/components/admin';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('AdminTitle component', () => {
  it('renders children correctly', () => {
    render(<AdminTitle title="Test title" />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Test title',
    });

    expect(heading).toBeInTheDocument();
  });

  it('applies correct class when className prop is provided', () => {
    render(
      <AdminTitle title="Test Title Two" className="text-3xl bg-accentColor" />,
    );
    const heading = screen.getByText('Test Title Two');
    expect(heading).toHaveClass('text-3xl bg-accentColor');
  });
});
