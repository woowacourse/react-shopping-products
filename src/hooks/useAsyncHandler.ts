import { useState } from 'react';
import { useToast } from './useToast';

export const useAsyncHandler = (defaultErrorMessage?: string) => {
  const [error, setError] = useState<string | null>(null);

  useToast(error, 'error');

  const handleAsyncOperation = async <T>(
    operation: () => Promise<T>,
  ): Promise<{ success: boolean; data?: T }> => {
    try {
      const result = await operation();
      setError(null);
      return { success: true, data: result };
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : defaultErrorMessage || '작업 중 오류가 발생했습니다';
      setError(errorMsg);
      return { success: false };
    }
  };

  const clearError = () => setError(null);

  return { handleAsyncOperation, error, clearError };
};
