import { useEffect, MutableRefObject } from 'react';

type IntersectionObserverCallback = () => void;
type IntersectionObserverOptions = IntersectionObserverInit;

interface intersectionCondition {
  loading: boolean;
  error: unknown;
}

const useIntersectionObserver = (
  { loading, error }: intersectionCondition,
  targetRef: MutableRefObject<Element | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverOptions,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && !error) {
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
