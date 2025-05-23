import {
  skeletonItemContainer,
  skeletonImage,
  skeletonContent,
  skeletonTitle,
  skeletonPrice,
  skeletonButton,
  skeletonListContainer,
} from './Skeleton.style';

export function ProductSkeleton() {
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

export function ProductListSkeleton() {
  return (
    <ul className={skeletonListContainer}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
    </ul>
  );
}
