import { useEffect, useRef } from 'react';

interface useIntersectionObserverProps {
  options?: IntersectionObserverInit;
  onIntersect: () => void;
}

const useIntersectionObserver = <T extends HTMLElement>({
  onIntersect,
  options,
}: useIntersectionObserverProps) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();

            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    observer.observe(targetRef.current);

    return () => {
      if (!targetRef.current) return;

      observer.unobserve(targetRef.current);
      observer.disconnect();
    };
  }, [options, onIntersect]);

  return targetRef;
};

export default useIntersectionObserver;
