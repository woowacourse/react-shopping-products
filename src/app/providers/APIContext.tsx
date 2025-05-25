import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { ApiDataKey, ApiDataTypeMap } from "../../shared/api/types/data";

type ApiDataState = {
  [K in ApiDataKey]?: ApiDataTypeMap[K] | { error: string };
};

export interface APIContextType {
  data: ApiDataState;
  setData: React.Dispatch<React.SetStateAction<ApiDataState>>;
  fetchData: <K extends ApiDataKey>(
    key: K,
    fetcher: () => Promise<ApiDataTypeMap[K]>
  ) => Promise<void>;
}

export const APIContext = createContext<APIContextType>({} as APIContextType);

export const APIProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<ApiDataState>({});

  const fetchData = useCallback(
    async <K extends ApiDataKey>(
      key: K,
      fetcher: () => Promise<ApiDataTypeMap[K]>
    ) => {
      try {
        const result = await fetcher();
        setData((prev) => ({ ...prev, [key]: result }));
      } catch (error) {
        setData((prev) => ({ ...prev, [key]: { error } }));
      }
    },
    []
  );

  return (
    <APIContext.Provider value={{ data, setData, fetchData }}>
      {children}
    </APIContext.Provider>
  );
};
