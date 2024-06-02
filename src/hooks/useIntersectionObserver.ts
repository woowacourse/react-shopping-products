import { useEffect, useRef } from "react";

interface useIntersectionObserverProps {
  onIntersect: () => void;
  options?: IntersectionObserverInit;
}

const useIntersectionObserver = <T extends HTMLElement>({
  onIntersect,
  options,
}: useIntersectionObserverProps) => {
  const observerRef = useRef<T>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const currentObserverTarget = observerRef.current;
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    }, options);
    observer.observe(currentObserverTarget);

    return () => {
      if (!currentObserverTarget) return;
      observer.unobserve(currentObserverTarget);
      observer.disconnect();
    };
  }, [onIntersect, options]);

  return observerRef;
};

export default useIntersectionObserver;
