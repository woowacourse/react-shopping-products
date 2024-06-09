import { useRef, useEffect } from "react";

const useIntersectionObserver = (callback: () => void, isFetching: boolean) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isFetching, callback]);

  return observerTarget;
};

export default useIntersectionObserver;
