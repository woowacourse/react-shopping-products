import { StrictPropsWithChildren } from "@/types/strict";
import { createContext, useContext, useState } from "react";
import { QueryClient } from "../QueryClient/QueryClient";

interface QueryClientProviderProps extends StrictPropsWithChildren {}

const queryClient = new QueryClient();

const QueryClientContext = createContext(queryClient);
export const useQueryClient = () => useContext(QueryClientContext);

export default function QueryClientProvider({ children }: QueryClientProviderProps) {
  const [data, setData] = useState<Record<string, any>>({});

  return <QueryClientContext.Provider value={queryClient}>{children}</QueryClientContext.Provider>;
}
