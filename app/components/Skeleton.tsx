import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonForm() {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-[300px] h-[730px] rounded-[20px] mb-[20px] sm:w-[390px] lg:w-[470px]">
        <Skeleton
          count={1}
          width={'100%'}
          height={'100%'}
          borderRadius={20}
          baseColor="#f7f7f7"
          highlightColor="#E5E4E2"
        />
      </div>
    </div>
  );
}
