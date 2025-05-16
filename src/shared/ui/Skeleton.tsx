import * as S from './Skeleton.styles';

export default function Skeleton() {
  return (
    <S.SkeletonWrapper>
      {Array.from({ length: 20 }).map((_, index) => (
        <S.SkeletonCard key={index} />
      ))}
    </S.SkeletonWrapper>
  );
}
