import { PropsWithChildren, RefObject, useEffect } from 'react';

interface InfinityScrollProp {
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  bottomRef: RefObject<HTMLDivElement>;
}

const InfinityScrollContainer = ({
  isLoading,
  isError,
  fetchNextPage,
  bottomRef,
  children,
}: PropsWithChildren<InfinityScrollProp>) => {
  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && !isError) {
        fetchNextPage();
      }
    };

    const options = {
      rootMargin: '0px 0px 30% 0px',
    };

    const io = new IntersectionObserver(onIntersect, options);

    if (bottomRef.current) {
      io.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        io.unobserve(bottomRef.current);
      }
    };
  }, [isLoading, fetchNextPage]);

  return <>{children}</>;
};

export default InfinityScrollContainer;
