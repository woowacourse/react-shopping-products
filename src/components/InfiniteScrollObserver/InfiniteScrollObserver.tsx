import { PropsWithChildren, useEffect, useRef } from 'react';

type Props = {
  hasMore: boolean;
  loadMore: () => void;
};

export default function InfiniteScrollObserver({
  children,
  hasMore,
  loadMore,
}: PropsWithChildren<Props>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (targetRef.current) observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, loadMore]);

  return (
    <>
      {children}
      <div ref={targetRef} style={{ height: '1px', background: 'transparent', width: '100%' }} />
    </>
  );
}
