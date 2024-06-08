import { useEffect, useRef } from 'react';

type UseIntersectionObserverProps = () => void;

const useIntersectionObserver = (fetchFn: UseIntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const options = {
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchFn();
      }
    }, options);

    if (lastProductElementRef.current) {
      observer.current.observe(lastProductElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchFn]);

  return { lastProductElementRef };
};

export default useIntersectionObserver;
