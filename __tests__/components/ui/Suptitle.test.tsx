import { Suptitle } from '@/components/ui';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Suptitle component', () => {
  it('renders children correctly', () => {
    render(<Suptitle>Test heading</Suptitle>);
    const titleEl = screen.getByRole('heading', {
      level: 3,
      name: 'Test heading',
    });
    expect(titleEl).toBeInTheDocument();
  });

  it('applies primary styles when the primary prop is true', () => {
    render(<Suptitle primary>Test heading</Suptitle>);
    const titleEl = screen.getByText('Test heading');
    expect(titleEl).toHaveClass('text-mainDarkColor before:bg-mainDarkColor');
    expect(titleEl).not.toHaveClass(
      'text-textColorDarkBg before:bg-textColorDarkBg',
    );
  });

  it('applies default styles when primary prop is false or not provided', () => {
    render(<Suptitle>Test heading</Suptitle>);
    const titleEl = screen.getByText('Test heading');
    expect(titleEl).not.toHaveClass(
      'text-mainDarkColor before:bg-mainDarkColor',
    );
    expect(titleEl).toHaveClass(
      'text-textColorDarkBg before:bg-textColorDarkBg',
    );
  });
});
