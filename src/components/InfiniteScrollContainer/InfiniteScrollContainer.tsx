import { ReactNode, useRef } from 'react';
import { useObserver } from '@/hooks/useObserver';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

type InfiniteScrollContainer = {
  children: ReactNode;
  fetchNextPage: () => void;
  isFetching: boolean;
  rootMargin?: number;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
};

export default function InfiniteScrollContainer({
  children,
  isFetching,
  fetchNextPage,
  rootMargin = 500,
  isSuccess,
}: InfiniteScrollContainer) {
  const bottom = useRef(null);
  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    !isFetching && entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    rootMargin: rootMargin + 'px', // 바닥에 덜 잫도록
  });

  return (
    <>
      {isSuccess && children}
      {isFetching && <LoadingSpinner />}
      <div ref={bottom} />
    </>
  );
}
