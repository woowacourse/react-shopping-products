import SkeletonCard from './SkeletonCard';
import S from './Skeleton.module.css';

const Skeleton = ({ length }: { length: number }) => {
  return (
    <div className={S.itemContainer}>
      {Array.from({ length: length }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Skeleton;
