import { Text } from '@/components/ui';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Text component', () => {
  it('renders children correctly', () => {
    render(<Text>Test text</Text>);
    const text = screen.getByText('Test text');
    expect(text).toBeInTheDocument();
  });

  it('applies primary styles when the primary prop is true', () => {
    render(<Text primary>Test text</Text>);
    const textEl = screen.getByText('Test text');
    expect(textEl).toHaveClass('text-textColor');
    expect(textEl).not.toHaveClass('text-mainDarkColor');
  });

  it('applies main styles when the main prop is true', () => {
    render(<Text main>Test text</Text>);
    const textEl = screen.getByText('Test text');
    expect(textEl).toHaveClass('mb-5');
    expect(textEl).not.toHaveClass('mb-0');
  });

  it('applies all combined styles when both main and primary props are true', () => {
    render(
      <Text main primary>
        Test text
      </Text>,
    );
    const textEl = screen.getByText('Test text');
    expect(textEl).toHaveClass('mb-5', 'text-textColor');
  });

  it('applies default styles when main and primary props are false or not provided', () => {
    render(<Text>Test text</Text>);
    const text = screen.getByText('Test text');
    expect(text).toHaveClass('mb-0', 'text-mainDarkColor');
  });
});
