import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonGridProps {
  rows: number;
  columns: number;
  buttonWidth?: string | number;
  buttonHeight?: string | number;
  borderRadius?: number;
  baseColor?: string;
  highlightColor?: string;
  className?: string;
}

export function SkeletonGrid({
  rows,
  columns,
  buttonWidth = '100%',
  buttonHeight = '100%',
  borderRadius = 8,
  baseColor = '#f7f7f7',
  highlightColor = '#E5E4E2',
  className = '',
}: SkeletonGridProps) {
  return (
    <div className={className}>
      {Array.from({ length: rows * columns }).map((_, index) => (
        <Skeleton
          key={index}
          width={buttonWidth}
          height={buttonHeight}
          borderRadius={borderRadius}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      ))}
    </div>
  );
}
