import { SkeletonBox } from '@/components/ui';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('react-loading-skeleton', () => {
  const MockSkeleton = ({
    width,
    height,
    baseColor,
    highlightColor,
    borderRadius,
  }: {
    width: string;
    height: string;
    baseColor: string;
    highlightColor: string;
    borderRadius: string;
  }) => (
    <div
      data-testid="skeleton"
      style={{ width, height, backgroundColor: baseColor, borderRadius }}
      data-highlight={highlightColor}
    ></div>
  );
  return MockSkeleton;
});

describe('SkeletonBox component', () => {
  it('renders skeleton', () => {
    render(<SkeletonBox />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('applies default props when optional props are not provided', () => {
    render(<SkeletonBox />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      width: '100%',
      height: '100%',
      backgroundColor: '#f7f7f7',
      borderRadius: '20px',
    });
  });

  it('applies custom props correctly', () => {
    render(
      <SkeletonBox
        width="50px"
        height="30px"
        borderRadius={12}
        baseColor="#cccccc"
        highlightColor="#aaaaaa"
      />,
    );
    const skeleton = screen.getAllByTestId('skeleton')[0];
    expect(skeleton).toHaveStyle({
      width: '50px',
      height: '30px',
      backgroundColor: '#cccccc',
      borderRadius: '12px',
    });
    expect(skeleton).toHaveAttribute('data-highlight', '#aaaaaa');
  });

  it('applies the provided className to the container', () => {
    render(<SkeletonBox className="custom-class" />);
    const grid = screen.getByTestId('skeleton-container');
    expect(grid).toHaveClass('custom-class');
  });
});
