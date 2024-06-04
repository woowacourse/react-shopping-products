import { useEffect, MutableRefObject } from 'react';

const useIntersectionObserver = (
  loading: boolean,
  targetRef: MutableRefObject<Element | null>,
  callback: () => void,
  options?: IntersectionObserverInit,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        callback();
      }
    }, options);

    const target = targetRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, callback, options]);
};

export default useIntersectionObserver;
