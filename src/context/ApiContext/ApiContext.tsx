import { createContext, PropsWithChildren, useCallback, useState } from "react";

export const ApiContext = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  loadingStates: Record<string, boolean>;
  updateLoadingState: (name: string, loading: boolean) => void;
}>({
  data: {},
  setData: () => {},
  loadingStates: {},
  updateLoadingState: () => {},
});

export function ApiProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  const updateLoadingState = useCallback(
    (name: string, newLoading: boolean) => {
      setLoadingStates((prevLoading) => ({
        ...prevLoading,
        [name]: newLoading,
      }));
    },
    []
  );

  return (
    <ApiContext.Provider
      value={{ data, setData, loadingStates, updateLoadingState }}
    >
      {children}
    </ApiContext.Provider>
  );
}
