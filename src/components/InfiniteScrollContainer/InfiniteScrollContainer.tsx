import { ReactNode, useRef } from 'react';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import { useObserver } from '@/hooks/useObserver';
import OptionalErrorArea from '../OptionalErrorArea/OptionalErrorArea';
import OptionalSuspense from '../OptionalSuspense/OptionalSuspense';

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
  isError,
  error,
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
    <OptionalErrorArea isError={isError} error={error}>
      {isSuccess && children}
      <OptionalSuspense isFetching={isFetching} fallbackComponent={<LoadingSpinner />}>
        <div ref={bottom} />
      </OptionalSuspense>
    </OptionalErrorArea>
  );
}
