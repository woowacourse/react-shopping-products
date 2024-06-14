import { useCallback, useRef } from 'react';

interface Props {
  onIntersect: () => void;
}

export const useInfinityScroll = ({ onIntersect }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback((node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold: 0.1,
      },
    );
    if (node) observer.current.observe(node);
  }, []);

  return { lastProductElementRef };
};
