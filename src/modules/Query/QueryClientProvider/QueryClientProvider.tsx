import { StrictPropsWithChildren } from "@/types/strict";
import { createContext, useContext, useState } from "react";
import { QueryClient } from "../QueryClient/QueryClient";

interface QueryClientProviderProps extends StrictPropsWithChildren {}

interface QueryClientContextType {
  getQueryData: (queryKey: string) => any;
  setQueryData: (queryKey: string, data: any) => void;
  getQueryStatus: (queryKey: string) => string;
  setQueryStatus: (queryKey: string, status: string) => void;
}

const QueryClientContext = createContext<QueryClientContextType>({
  getQueryData: () => {},
  setQueryData: () => {},
  getQueryStatus: () => "",
  setQueryStatus: () => {},
});

export const useQueryClient = () => useContext(QueryClientContext);

export default function QueryClientProvider({ children }: QueryClientProviderProps) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState({});

  const setQueryData = (queryKey: string, data: any) => {
    setData((prev) => ({ ...prev, [queryKey]: data }));
  };

  const getQueryData = (queryKey: string) => {
    return data[queryKey];
  };

  const setQueryStatus = (queryKey: string, status: string) => {
    setStatus((prev) => ({ ...prev, [queryKey]: status }));
  };

  const getQueryStatus = (queryKey: string) => {
    return status[queryKey];
  };

  return (
    <QueryClientContext.Provider
      value={{
        getQueryData,
        setQueryData,
        getQueryStatus,
        setQueryStatus,
      }}
    >
      {children}
    </QueryClientContext.Provider>
  );
}
