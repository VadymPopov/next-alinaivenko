import { SlidingMenu } from '@/components/ui';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Suptitle component', () => {
  it('renders children correctly', () => {
    render(<SlidingMenu isOpen>Menu Content</SlidingMenu>);
    expect(screen.getByText('Menu Content')).toBeInTheDocument();
  });

  it('applies correct styles when isOpen is true', () => {
    render(<SlidingMenu isOpen>Menu Open</SlidingMenu>);
    expect(screen.getByText('Menu Open')).toHaveStyle({
      transform:
        'translate3d(0%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      transition:
        'opacity 1s ease-in-out, transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)',
    });
  });

  it('applies the correct styles when isOpen is false and position is "left"', () => {
    render(
      <SlidingMenu isOpen={false} position="left">
        Menu Closed
      </SlidingMenu>,
    );
    expect(screen.getByText('Menu Closed')).toHaveStyle({
      transform:
        'translate3d(-100%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
    });
  });

  it('applies additional custom classes passed via props', () => {
    render(
      <SlidingMenu isOpen={true} className="test-class">
        Menu Open
      </SlidingMenu>,
    );
    expect(screen.getByText('Menu Open')).toHaveClass('test-class');
  });
});
