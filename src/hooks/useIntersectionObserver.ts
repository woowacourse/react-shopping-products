import { useEffect, useState } from "react";

interface UseIntersectionObserver<T> {
  setTarget: (target: T) => void;
}

const createIntersectionHandler =
  (callback: () => void): IntersectionObserverCallback =>
  (entries) => {
    if (entries[0].isIntersecting) {
      callback();
    }
  };

const useIntersectionObserver = <T extends Element>(
  onIntersected: () => void
): UseIntersectionObserver<T> => {
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
