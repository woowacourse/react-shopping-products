import { useContext, useEffect } from "react";
import { APIContext } from "../../app/providers/ApiContext";
import { ApiDataKey, ApiDataTypeMap } from "../api/types/data";

export const useAPI = <K extends ApiDataKey>(
  key: K,
  fetcher: () => Promise<ApiDataTypeMap[K]>
) => {
  const { data, fetchData } = useContext(APIContext);

  useEffect(() => {
    if (!data[key]) fetchData(key, fetcher);
  }, [key, fetcher, data, fetchData]);

  return {
    data: data[key] as K | undefined,
    refetch: () => fetchData(key, fetcher),
  };
};
