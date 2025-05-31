import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import ErrorBox from '../components/common/ErrorBox/ErrorBox';

type ErrorContextType = {
  showError: (message: string) => void;
};

export const ErrorContext = createContext<ErrorContextType | null>(null);

function ErrorProvider({ children }: PropsWithChildren) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const showError = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);
  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errorMessage && <ErrorBox message={errorMessage} backgroundColor='#FFC9C9' />}
    </ErrorContext.Provider>
  );
}

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError는 ErrorProvider 내에서 사용해야 합니다.');
  }
  return context;
};

export default ErrorProvider;
