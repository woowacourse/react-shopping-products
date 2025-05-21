import { StrictPropsWithChildren } from "@/types/strict";
import { createContext, useContext, useState } from "react";

interface QueryProviderProps extends StrictPropsWithChildren {}

type Status = "idle" | "loading" | "success" | "error";

interface QueryClientContextType {
  getQueryData: (queryKey: string) => any;
  setQueryData: (queryKey: string, data: any) => void;
  getQueryStatus: (queryKey: string) => Status;
  setQueryStatus: (queryKey: string, status: Status) => void;
}

const QueryClientContext = createContext<QueryClientContextType>({
  getQueryData: () => {},
  setQueryData: () => {},
  getQueryStatus: () => "idle",
  setQueryStatus: () => {},
});

export const useQueryClient = () => useContext(QueryClientContext);

export default function QueryProvider({ children }: QueryProviderProps) {
  const [data, setData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<Record<string, Status>>({});

  const setQueryData = (queryKey: string, data: any) => {
    setData((prev) => ({ ...prev, [queryKey]: data }));
  };

  const getQueryData = (queryKey: string) => {
    return data[queryKey];
  };

  const setQueryStatus = (queryKey: string, status: Status) => {
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
