import { useEffect, useRef } from 'react';

const useIntersectionObserver = <T extends HTMLElement>(callback: () => void) => {
  const observerRef = useRef<T>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {
        threshold: 0.7,
      },
    );
    observer.observe(observerRef.current);

    return () => {
      if (!observerRef.current) return;
      observer.unobserve(observerRef.current);
    };
  }, [callback]);

  return observerRef;
};

export default useIntersectionObserver;
