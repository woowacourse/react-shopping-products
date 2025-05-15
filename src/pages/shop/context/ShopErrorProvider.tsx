import { createContext, ReactNode, useCallback, useState } from 'react';

export const ShopErrorContext = createContext<{
  isError: boolean;
  errorMessage: string;
  handleErrorTrue: (message: string) => void;
  handleErrorFalse: () => void;
} | null>(null);

function ShopErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const handleErrorTrue = useCallback((message: string) => {
    setError({ isError: true, errorMessage: message });
  }, []);

  const handleErrorFalse = useCallback(() => {
    setError({ isError: false, errorMessage: '' });
  }, []);

  return (
    <ShopErrorContext.Provider
      value={{
        isError: error.isError,
        errorMessage: error.errorMessage,
        handleErrorTrue,
        handleErrorFalse,
      }}
    >
      {children}
    </ShopErrorContext.Provider>
  );
}

export default ShopErrorProvider;
