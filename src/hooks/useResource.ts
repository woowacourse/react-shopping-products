import { useState, useCallback } from "react";
import request from "../utils/request";
import { ERROR_TYPE } from "./useError";

export function useResource<T>(
  setErrorTrue: (type: ERROR_TYPE) => void,
  errorType: ERROR_TYPE
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (url: string) => {
      try {
        setIsLoading(true);
        const res: T = await request({
          method: "GET",
          url,
        });
        setData(res);
      } catch {
        setErrorTrue(errorType);
      } finally {
        setIsLoading(false);
      }
    },
    [setErrorTrue, errorType]
  );

  return { data, fetchData, isLoading };
}
