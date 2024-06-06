import { useEffect, MutableRefObject } from 'react';

type IntersectionObserverCallback = () => void;
type IntersectionObserverOptions = IntersectionObserverInit;

interface intersectionCondition {
  isLoading: boolean;
  error: unknown;
}

const useIntersectionObserver = (
  { isLoading, error }: intersectionCondition,
  targetRef: MutableRefObject<Element | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverOptions,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && !error) {
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
