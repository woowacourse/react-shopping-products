import React, { useEffect } from 'react';

interface IntersectionObserverAreaProps {
  callback: (entries: IntersectionObserverEntry[]) => void;
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
}

function IntersectionObserverArea({
  targetRef,
  callback,
  children,
}: React.PropsWithChildren<IntersectionObserverAreaProps>) {
  const observer = new IntersectionObserver(callback, { threshold: 1 });

  useEffect(() => {
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, targetRef]);

  return <div>{children}</div>;
}

export default IntersectionObserverArea;
