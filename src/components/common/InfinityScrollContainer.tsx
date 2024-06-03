import { PropsWithChildren, RefObject, useEffect } from 'react';

import useToast from '@/hooks/useToast';

interface InfinityScrollProp {
  isLoading: boolean;
  fetchNextPage: () => void;
  bottomRef: RefObject<HTMLDivElement>;
}

const InfinityScrollContainer = ({
  isLoading,
  fetchNextPage,
  bottomRef,
  children,
}: PropsWithChildren<InfinityScrollProp>) => {
  const toast = useToast();

  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && !toast.isShow) {
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
  }, [isLoading, fetchNextPage]);

  return <>{children}</>;
};

export default InfinityScrollContainer;
