import { createContext, useState, ReactNode } from 'react';
import ErrorToast from '../components/Toast/ErrorToast';
import ERROR_MESSAGE from '../constants/ERROR_MESSAGE';

export const ErrorContext = createContext<{ showError: (msg: string) => void }>({
  showError: () => {},
});

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState('');

  return (
    <ErrorContext.Provider
      value={{
        showError: (msg) => {
          if (msg === 'Failed to fetch') setError(ERROR_MESSAGE.NO_INTERNET);
          else setError(msg);
        },
      }}>
      {children}
      {error && <ErrorToast message={error} onClose={() => setError('')} />}
    </ErrorContext.Provider>
  );
}
