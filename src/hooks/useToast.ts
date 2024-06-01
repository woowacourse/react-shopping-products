import { useEffect, useState } from 'react';

import useErrorContext from './useErrorContext';

const useToast = () => {
  const { error, setError } = useErrorContext();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  return {
    showToast,
    error,
  };
};

export default useToast;
