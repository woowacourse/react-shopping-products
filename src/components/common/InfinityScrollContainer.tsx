import { PropsWithChildren, RefObject, useEffect } from 'react';

interface InfinityScrollProp {
  isPending: boolean;
  fetchNextPage: () => void;
  bottomRef: RefObject<HTMLDivElement>;
}

const InfinityScrollContainer = ({
  isPending,
  fetchNextPage,
  bottomRef,
  children,
}: PropsWithChildren<InfinityScrollProp>) => {
  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isPending) {
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
  }, [isPending, fetchNextPage]);

  return <>{children}</>;
};

export default InfinityScrollContainer;
