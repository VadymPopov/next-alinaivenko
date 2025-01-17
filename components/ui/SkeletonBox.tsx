import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonBoxProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  baseColor?: string;
  highlightColor?: string;
  className?: string;
}

export default function SkeletonBox({
  width = '100%',
  height = '100%',
  borderRadius = 20,
  baseColor = '#f7f7f7',
  highlightColor = '#E5E4E2',
  className = '',
}: SkeletonBoxProps) {
  return (
    <div className={className}>
      <Skeleton
        count={1}
        width={width}
        height={height}
        borderRadius={borderRadius}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
    </div>
  );
}
