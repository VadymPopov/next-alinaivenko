import { Title } from '@/components/ui';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Title component', () => {
  it('renders children correctly', () => {
    render(<Title>Test title</Title>);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Test title',
    });

    expect(heading).toBeInTheDocument();
  });

  it('applies correct class when secondary is true', () => {
    render(<Title secondary>Test Title Two</Title>);
    const heading = screen.getByText('Test Title Two');
    expect(heading).toHaveClass('text-end');
  });

  it('applies correct class when secondary is false', () => {
    render(<Title>Test Title Three</Title>);
    const heading = screen.getByText('Test Title Three');
    expect(heading).toHaveClass('text-start');
  });
});
