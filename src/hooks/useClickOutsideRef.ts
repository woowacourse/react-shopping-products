import { useEffect, useRef } from 'react';

/**
 * 특정 요소 바깥을 클릭했을 때 콜백 함수를 실행하는 훅입니다.
 *
 * @template T - 참조할 요소(Element)의 타입입니다. 기본값은 HTMLElement입니다.
 * @param callback - 요소 외부를 클릭했을 때 호출할 함수입니다.
 * @returns 대상 요소에 연결할 ref 객체를 반환합니다.
 */
export function useClickOutsideRef<T extends HTMLElement = HTMLElement>(
  callback: (() => void) | null
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!callback) return;

    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };

    document.addEventListener('click', listener, true);
    return () => {
      document.removeEventListener('click', listener, true);
    };
  }, [callback]);

  return ref;
}
