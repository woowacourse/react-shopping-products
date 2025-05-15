import { useContext } from 'react';
import { ErrorMessageContext } from '../context/ErrorMessageContext';

const useErrorMessageContext = () => {
  const context = useContext(ErrorMessageContext);

  if (!context) {
    throw new Error('ErrorProvider 안에서 사용해야 합니다.');
  }

  return context;
};

export default useErrorMessageContext;
