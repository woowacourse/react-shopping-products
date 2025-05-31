import { useCallback, useEffect } from 'react';

interface UseCloseOnESCProps {
  closeModal: () => void;
}

export function useCloseOnESC({ closeModal }: UseCloseOnESCProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
