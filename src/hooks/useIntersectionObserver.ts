import { useEffect, useState } from "react";

interface UseIntersectionObserver<T> {
  setTarget: (target: T) => void;
}

const useIntersectionObserver = <T extends Element>(
  callback: IntersectionObserverCallback
): UseIntersectionObserver<T> => {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(callback);
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [callback, target]);

  return { setTarget: (target: T) => setTarget(target) };
};

export default useIntersectionObserver;
