import { useEffect } from 'react';
import { useErrorContext } from '../contexts/ErrorContext';

export default function useErrorHandler(error: Error | null) {
  const { showError } = useErrorContext();

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);
}
