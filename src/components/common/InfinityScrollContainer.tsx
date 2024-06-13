import { PropsWithChildren, RefObject, useEffect } from 'react';

interface InfinityScrollProp {
  isFetching: boolean;
  fetchNextPage: () => void;
  bottomRef: RefObject<HTMLDivElement>;
}

const InfinityScrollContainer = ({
  isFetching,
  fetchNextPage,
  bottomRef,
  children,
}: PropsWithChildren<InfinityScrollProp>) => {
  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetching) {
        fetchNextPage();
      }
    };

    const options = {};

    const io = new IntersectionObserver(onIntersect, options);

    if (bottomRef.current) {
      io.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        io.unobserve(bottomRef.current);
      }
    };
  }, [isFetching, fetchNextPage]);

  return <>{children}</>;
};

export default InfinityScrollContainer;
