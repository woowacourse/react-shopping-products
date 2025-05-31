import { useState, useCallback } from "react";
import request from "../utils/request";
import { ERROR_TYPE } from "./useError";

export function useResource<T>(
  setErrorTrue: (type: ERROR_TYPE) => void,
  errorType: ERROR_TYPE
) {
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(
    async (url: string) => {
      try {
        const res: T = await request({
          method: "GET",
          url,
        });
        setData(res);
      } catch {
        setErrorTrue(errorType);
      }
    },
    [setErrorTrue, errorType]
  );

  return { data, fetchData };
}
