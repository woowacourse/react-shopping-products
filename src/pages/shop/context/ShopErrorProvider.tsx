import { createContext, ReactNode, useCallback, useState } from 'react';

export const ShopErrorContext = createContext<{
  isError: boolean;
  handleErrorTrue: () => void;
  handleErrorFalse: () => void;
}>({
  isError: false,
  handleErrorTrue: () => {},
  handleErrorFalse: () => {},
});

function ShopErrorProvider({ children }: { children: ReactNode }) {
  const [isError, setIsError] = useState(false);
  console.log(isError);

  const handleErrorTrue = useCallback(() => {
    console.log('handle', isError);
    setIsError(true);
  }, []);

  const handleErrorFalse = useCallback(() => {
    setIsError(false);
  }, []);

  return (
    <ShopErrorContext.Provider
      value={{ isError, handleErrorTrue, handleErrorFalse }}
    >
      {children}
    </ShopErrorContext.Provider>
  );
}

export default ShopErrorProvider;
