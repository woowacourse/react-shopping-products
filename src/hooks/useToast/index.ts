import { useEffect, useState } from 'react';

const useToast = () => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  return { errorMessage, setErrorMessage };
};

export default useToast;
