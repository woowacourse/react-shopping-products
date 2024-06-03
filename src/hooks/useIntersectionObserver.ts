import { useEffect, useState } from "react";

interface UseIntersectionObserverReturn<T> {
  setTarget: (target: T) => void;
}

const useIntersectionObserver = <T extends Element>(
  onIntersected: () => void
): UseIntersectionObserverReturn<T> => {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(createIntersectionHandler(onIntersected));
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [onIntersected, target]);

  return { setTarget: (target: T) => setTarget(target) };
};

export default useIntersectionObserver;

const createIntersectionHandler =
  (callback: () => void): IntersectionObserverCallback =>
  (entries) => {
    if (entries[0].isIntersecting) {
      callback();
    }
  };
