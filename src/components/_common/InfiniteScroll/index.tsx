import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  fetchingFunction: () => void;
  hasNextPage: boolean;
  children: React.ReactNode;
}

const InfiniteScroll = ({ fetchingFunction, hasNextPage, children }: InfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver({ threshold: 0.25, rootMargin: "80px" }, targetRef);

  useEffect(() => {
    if (isIntersecting) {
      fetchingFunction();
    }
  }, [isIntersecting]);

  return (
    <>
      <div>{children}</div>
      {hasNextPage && <div ref={targetRef} />}
    </>
  );
};

export default InfiniteScroll;
