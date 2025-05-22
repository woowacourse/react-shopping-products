import { createContext, useState, ReactNode, useMemo } from 'react';
import ErrorToast from '../components/Toast/ErrorToast';
import ERROR_MESSAGE from '../constants/ERROR_MESSAGE';

export const ErrorContext = createContext<{ showError: (msg: string) => void }>({
  showError: () => {},
});

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState('');

  const contextValue = useMemo(() => {
    return {
      showError: (msg: string) => {
        if (msg === 'Failed to fetch') setError(ERROR_MESSAGE.NO_INTERNET);
        else setError(msg);
      },
    };
  }, []);

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
      {error && <ErrorToast message={error} onClose={() => setError('')} />}
    </ErrorContext.Provider>
  );
}
