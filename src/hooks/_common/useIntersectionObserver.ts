import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 }
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback]);

  const observe = (element: Element) => {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element: Element) => {
    if (element && observer.current) {
      observer.current.unobserve(element);
    }
  };

  return [observe, unobserve] as const;
};

export default useIntersectionObserver;
