import { SkeletonGrid } from '@/components/ui';

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

describe('SkeletonGrid component', () => {
  it('renders the correct number of skeleton elements', () => {
    render(<SkeletonGrid rows={3} columns={4} />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(12);
  });

  it('applies default props when optional props are not provided', () => {
    render(<SkeletonGrid rows={1} columns={1} />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      width: '100%',
      height: '100%',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
    });
  });

  it('applies custom props correctly', () => {
    render(
      <SkeletonGrid
        rows={2}
        columns={2}
        buttonWidth="50px"
        buttonHeight="30px"
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
    render(<SkeletonGrid rows={2} columns={2} className="custom-class" />);
    const grid = screen.getByTestId('skeleton-grid');
    expect(grid).toHaveClass('custom-class');
  });
});
