import { Button } from '@/components/ui';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
  it('renders correctly with children', () => {
    render(<Button>Test btn</Button>);

    expect(screen.getByText(/test btn/i)).toBeInTheDocument();
  });

  it('applies correct styles when primary is true', () => {
    render(<Button primary>Test btn</Button>);
    const btn = screen.getByText(/test btn/i);

    expect(btn).toHaveClass(
      'bg-accentColor text-mainLightColor hover:shadow-md hover:shadow-mainLightColor hover:text-cardColor',
    );

    expect(btn).not.toHaveClass(
      'bg-transparent text-cardColor border-[1px] border-accentColor hover:bg-accentColor hover:text-mainLightColor hover:shadow-md hover:shadow-cardColor',
    );
  });

  it('applies correct styles when disabled is true', () => {
    render(<Button disabled>Test btn</Button>);
    const btn = screen.getByText(/test btn/i);

    expect(btn).toHaveClass('cursor-not-allowed opacity-70 bg-textColorDarkBg');

    expect(btn).not.toHaveClass(
      'bg-transparent text-cardColor border-[1px] border-accentColor hover:bg-accentColor hover:text-mainLightColor hover:shadow-md hover:shadow-cardColor',
    );
  });

  it('renders loader when isProcessing is true', () => {
    render(<Button isProcessing>Test btn</Button>);

    expect(screen.getByTestId('color-ring-svg')).toBeInTheDocument();
  });

  it('applies custom styles correctly', () => {
    render(<Button styles="bg-red-500">Test btn</Button>);
    const btn = screen.getByText(/test btn/i);

    expect(btn).toHaveClass('bg-red-500');
  });

  it('fires onClick event when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have aria-disabled attribute when disabled', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('button receives focus', async () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    await userEvent.tab();

    expect(button).toHaveFocus();
  });
});
