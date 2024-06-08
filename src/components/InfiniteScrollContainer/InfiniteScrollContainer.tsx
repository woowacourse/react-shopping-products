import { ReactNode, useEffect, useRef } from 'react';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import { useObserver } from '@/hooks/useObserver';
import { useToast } from '@/hooks/useToast';

type InfiniteScrollContainer = {
  children: ReactNode;
  fetchNextPage: () => void;
  isFetching: boolean;
  rootMargin?: number;
  isError: boolean;
  error: Error | null;
};

export default function InfiniteScrollContainer({
  children,
  isFetching,
  fetchNextPage,
  rootMargin = 500,
  isError,
  error,
}: InfiniteScrollContainer) {
  const { showToast } = useToast();
  const bottom = useRef(null);

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    !isFetching && entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    rootMargin: rootMargin + 'px', // 바닥에 덜 잫도록
  });

  useEffect(() => {
    if (isError && error) showToast(error.message);
  }, [isError]);

  return (
    <>
      {children}
      {isFetching && <LoadingSpinner />}
      {!isFetching && <div ref={bottom}></div>}
    </>
  );
}
