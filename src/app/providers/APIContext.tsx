import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { ApiDataKey, ApiDataTypeMap } from "../../shared/api/types/data";
import { ApiError } from "../../shared/api/apiClient";

type ApiDataState = {
  [K in ApiDataKey]?: ApiDataTypeMap[K] | ApiError;
};

export interface APIContextType {
  data: ApiDataState;
  setData: React.Dispatch<React.SetStateAction<ApiDataState>>;
  fetchData: <K extends ApiDataKey>(
    key: K,
    fetcher: () => Promise<ApiDataTypeMap[K] | ApiError>
  ) => Promise<void>;
}

export const APIContext = createContext<APIContextType>({} as APIContextType);

export const APIProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<ApiDataState>({});

  const fetchData = useCallback(
    async <K extends ApiDataKey>(
      key: K,
      fetcher: () => Promise<ApiDataTypeMap[K] | ApiError>
    ) => {
      try {
        const result = await fetcher();
        setData((prev) => ({ ...prev, [key]: result }));
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";

        setData((prev) => ({ ...prev, [key]: { error: errorMessage } }));
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
