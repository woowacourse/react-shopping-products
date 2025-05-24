import { createContext, ReactNode, useCallback, useState } from 'react';

export const ShopErrorContext = createContext<{
  isError: boolean;
  errorMessage: string;
  showErrorMessage: (message: string) => void;
  hideErrorMessage: () => void;
} | null>(null);

function ShopErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const showErrorMessage = useCallback((message: string) => {
    setError({ isError: true, errorMessage: message });
  }, []);

  const hideErrorMessage = useCallback(() => {
    setError({ isError: false, errorMessage: '' });
  }, []);

  return (
    <ShopErrorContext.Provider
      value={{
        isError: error.isError,
        errorMessage: error.errorMessage,
        showErrorMessage,
        hideErrorMessage,
      }}
    >
      {children}
    </ShopErrorContext.Provider>
  );
}

export default ShopErrorProvider;
