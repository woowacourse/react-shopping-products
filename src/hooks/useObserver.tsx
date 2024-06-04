import { useEffect, RefObject } from 'react';

interface UseObserverParams {
  target: RefObject<Element>; // 감지할 대상, ref를 넘길 예정
  onIntersect: IntersectionObserverCallback; // 감지 시 실행할 callback 함수
  root?: Element | null; // 교차할 부모 요소, 지정이 없거나 null인 경우 그냥 브라우저의 현재 뷰라고 보면 된다.
  rootMargin?: string; // root와 target이 감지하는 여백의 거리, 미리 불러올거면 양수로 큰 값을 준다.
  threshold?: number | number[]; // 임계점. 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
}

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
}: UseObserverParams): void => {
  useEffect(() => {
    if (!target.current) {
      return;
    }

    let observer: IntersectionObserver;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });

      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold, onIntersect, root]);
};
