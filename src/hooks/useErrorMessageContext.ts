import { useContext } from 'react';
import { ErrorMessageContext } from '../context/ErrorMessageContext';
import { DEV_ERROR_MESSAGE } from '../constants/errorMessages';

const useErrorMessageContext = () => {
  const context = useContext(ErrorMessageContext);

  if (!context) {
    throw new Error(DEV_ERROR_MESSAGE.INVALID_PROVIDER('ErrorMessageContext'));
  }

  return context;
};

export default useErrorMessageContext;
