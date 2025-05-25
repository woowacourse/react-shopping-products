import { createContext, useState, type PropsWithChildren } from "react";

interface APIContextType {
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  isLoading: Record<string, boolean>;
  setIsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  error: Record<string, { isError: boolean; errorMessage: string }>;
  setError: React.Dispatch<
    React.SetStateAction<
      Record<string, { isError: boolean; errorMessage: string }>
    >
  >;
}

export const APIContext = createContext<APIContextType | null>(null);

export function APIProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [error, setError] = useState<
    Record<string, { isError: boolean; errorMessage: string }>
  >({});

  return (
    <APIContext.Provider
      value={{ data, setData, isLoading, setIsLoading, error, setError }}
    >
      {children}
    </APIContext.Provider>
  );
}
