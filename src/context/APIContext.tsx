import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ErrorType = {
  isError: boolean;
  errorMessage: string;
};

interface APIContextType {
  state: Record<string, unknown>;
  setState: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  isLoading: Record<string, boolean>;
  setIsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  error: Record<string, ErrorType>;
  setError: React.Dispatch<React.SetStateAction<Record<string, ErrorType>>>;
}

const APIContext = createContext<APIContextType | null>(null);

export function APIProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, ErrorType>>({});

  return (
    <APIContext.Provider
      value={{ state, setState, isLoading, setIsLoading, error, setError }}
    >
      {children}
    </APIContext.Provider>
  );
}

export const useAPIContext = () => {
  const context = useContext(APIContext);

  if (context === null) {
    throw new Error(
      'useAPIContext는 APIContextProvider과 함께 사용되어야 합니다.'
    );
  }
  return context;
};
