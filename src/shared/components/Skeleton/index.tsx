import { StyledSkeleton } from './Skeleton.styled';

export type SkeletonProps = {
  width: string | number;
  height: string | number;
};

export const Skeleton = ({ width, height }: SkeletonProps) => {
  return <StyledSkeleton width={width} height={height} />;
};
