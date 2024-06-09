import { useRef, useEffect } from "react";

const useIntersectionObserver = (callback: () => void, isFetching: boolean) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTarget = observerTarget.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isFetching, callback]);

  return observerTarget;
};

export default useIntersectionObserver;
