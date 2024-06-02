import { PropsWithChildren, useEffect, useRef } from "react";

import LoadingDots from "./LoadingDots";

import styled from "@emotion/styled";

interface InfiniteProductsScrollComponentProps extends PropsWithChildren {
  isLoading: boolean;
  handleScroll: () => void;
}

const S = {
  FallbackContainer: styled.div`
    width: calc(183px * 2 + 16px);
    margin: 16px 0;
  `,
};

const InfiniteProductsScrollComponent = ({
  children,
  isLoading,
  handleScroll,
}: InfiniteProductsScrollComponentProps) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          handleScroll();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, handleScroll]);

  return (
    <>
      {children}
      <S.FallbackContainer>
        <div ref={loaderRef}>{isLoading && <LoadingDots />}</div>
      </S.FallbackContainer>
    </>
  );
};

export default InfiniteProductsScrollComponent;
