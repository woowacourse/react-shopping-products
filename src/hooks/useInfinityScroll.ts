import { useCallback, useRef } from 'react';

interface Props {
  isLastPage: boolean;
  increaseNextPage: () => void;
}

export const useInfinityScroll = ({ isLastPage, increaseNextPage }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLastPage) {
            increaseNextPage();
          }
        },
        {
          threshold: 0.1,
        },
      );
      if (node) observer.current.observe(node);
    },
    [isLastPage, increaseNextPage],
  );

  return { lastProductElementRef };
};
