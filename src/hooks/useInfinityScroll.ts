import { Dispatch, SetStateAction, useCallback, useRef } from 'react';

interface Props {
  isLastPage: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}

export const useInfinityScroll = ({ isLastPage, setPage }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLastPage) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          threshold: 0.1,
        },
      );
      if (node) observer.current.observe(node);
    },
    [isLastPage, setPage],
  );

  return { lastProductElementRef };
};
