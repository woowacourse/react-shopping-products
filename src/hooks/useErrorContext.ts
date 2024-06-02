import { ErrorContext } from '@/contexts/ErrorContext';
import { useContext } from 'react';

const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error('ErrorProvider not found');

  const { error, setError } = context;
  return { error, setError };
};

export default useErrorContext;
