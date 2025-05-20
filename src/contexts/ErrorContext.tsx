import { createContext, useState, ReactNode } from 'react';
import ErrorToast from '../components/Toast/ErrorToast';

export const ErrorContext = createContext<{ showError: (msg: string) => void }>({
  showError: () => {},
});

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState('');

  return (
    <ErrorContext.Provider
      value={{
        showError: (msg) => {
          if (msg === 'Failed to fetch') setError('인터넷 오류입니다. 확인 후 다시 시도해주세요.');
          else setError(msg);
        },
      }}>
      {children}
      {error && <ErrorToast message={error} onClose={() => setError('')} />}
    </ErrorContext.Provider>
  );
}
