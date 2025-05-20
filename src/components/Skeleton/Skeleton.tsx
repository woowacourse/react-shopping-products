import { DEFAULT_SKELETON_ITEM_COUNT } from '../../constants/skeleton';
import {
  skeletonItemContainer,
  skeletonImage,
  skeletonContent,
  skeletonTitle,
  skeletonPrice,
  skeletonButton,
  skeletonListContainer,
} from './Skeleton.style';

function ProductSkeleton() {
  return (
    <li className={skeletonItemContainer}>
      <div className={skeletonImage}></div>
      <div className={skeletonContent}>
        <div className={skeletonTitle}></div>
        <div className={skeletonPrice}></div>
        <div className={skeletonButton}></div>
      </div>
    </li>
  );
}

export function ProductListSkeleton({ count = DEFAULT_SKELETON_ITEM_COUNT }: { count: number }) {
  return (
    <ul className={skeletonListContainer}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
    </ul>
  );
}
