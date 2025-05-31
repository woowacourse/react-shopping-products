import { useEffect, useRef } from 'react';

const useFocusTrap = ({ isActive }: { isActive: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    const focusableElements = containerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      const currentElement = document.activeElement;

      if (currentElement === lastElement && e.key === 'Tab') {
        e.preventDefault();
        firstElement.focus();
      }
      if (currentElement === firstElement && e.shiftKey) {
        e.preventDefault();
        lastElement.focus();
      }
    };

    currentRef?.addEventListener('keydown', handleKeydown);

    return () => {
      currentRef?.removeEventListener('keydown', handleKeydown);
    };
  }, [isActive]);

  return { containerRef };
};

export default useFocusTrap;
