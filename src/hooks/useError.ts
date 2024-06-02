import { useState } from 'react';

import { ErrorState } from '@/types/error';

const INITIAL_ERROR_STATE: ErrorState = {
  isError: false,
  name: '',
  errorMessage: '',
};

const useError = () => {
  const [errorState, setErrorState] = useState<ErrorState>(INITIAL_ERROR_STATE);

  const handleError = ({ name, isError, errorMessage }: ErrorState) => {
    setErrorState({ isError, name, errorMessage });
  };

  const resetError = () => {
    setErrorState(INITIAL_ERROR_STATE);
  };

  return { errorState, handleError, resetError };
};

export default useError;
