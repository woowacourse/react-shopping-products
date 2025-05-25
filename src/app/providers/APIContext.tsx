import { createContext, useCallback, useState } from "react";
import { ApiResponse } from "../../shared/api/apiClient";
import { ApiDataKey, ApiDataTypeMap } from "../../shared/api/types/data";

type ApiDataState = {
  [K in ApiDataKey]?: ApiResponse<ApiDataTypeMap[K]>;
};

export interface APIContextType {
  data: ApiDataState;
  setData: React.Dispatch<React.SetStateAction<ApiDataState>>;
  fetchData: <K extends ApiDataKey>(
    key: K,
    fetcher: () => Promise<ApiResponse<ApiDataTypeMap[K]>>
  ) => Promise<void>;
}

export const APIContext = createContext<APIContextType>({} as APIContextType);

export const APIProvider = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = useState<ApiDataState>({});

  const fetchData = useCallback(
    async <K extends ApiDataKey>(
      key: K,
      fetcher: () => Promise<ApiResponse<ApiDataTypeMap[K]>>
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
