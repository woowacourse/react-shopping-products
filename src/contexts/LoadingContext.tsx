import { createContext, useContext, useState } from "react";

interface LoadingState {
  isFetching: boolean;
  isMutating: boolean;
}

interface LoadingContextType {
  isLoading: LoadingState;
  startFetching: () => void;
  endFetching: () => void;
  startMutating: () => void;
  endMutating: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<LoadingState>({
    isFetching: false,
    isMutating: false,
  });

  const startFetching = () => setIsLoading((prev) => ({ ...prev, isFetching: true }));
  const endFetching = () => setIsLoading((prev) => ({ ...prev, isFetching: false }));

  const startMutating = () => setIsLoading((prev) => ({ ...prev, isMutating: true }));
  const endMutating = () => setIsLoading((prev) => ({ ...prev, isMutating: false }));

  return (
    <LoadingContext.Provider value={{ isLoading, startFetching, endFetching, startMutating, endMutating }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within an LoadingProvider");
  return context;
};
