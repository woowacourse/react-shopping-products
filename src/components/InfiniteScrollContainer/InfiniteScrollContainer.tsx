import React, { useEffect, useRef } from "react";

import * as Styled from "./InfiniteScrollContainer.style";

interface InfiniteScrollContainerProps {
  onIntersect: () => void;
  children: React.ReactNode;
  isObserverActive?: boolean;
  options?: IntersectionObserverInit;
}

export default function InfiniteScrollContainer({
  onIntersect,
  children,
  isObserverActive = true,
  options = {
    threshold: 0.7,
  },
}: InfiniteScrollContainerProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentObserverElement = observerRef.current;
    if (!currentObserverElement) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      { ...options },
    );

    observer.observe(observerRef.current);

    return () => {
      if (!currentObserverElement) return;

      observer.unobserve(currentObserverElement);
      observer.disconnect();
    };
  }, [onIntersect, options]);

  return (
    <>
      {children}
      <Styled.ObserverTarget
        $isObserverActive={isObserverActive}
        ref={observerRef}
      />
    </>
  );
}
