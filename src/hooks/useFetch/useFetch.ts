import { useCallback, useState } from "react";
import { useToast } from "../../provider/ToastProvider";
import request from "../../utils/request";
import { Method } from "../../types/index.types";
import { ERROR_TYPE } from "../../provider/ToastProvider";
interface GetProducts {
  method: Method;
  url: string;
  errorType: ERROR_TYPE;
}

export default function useFetch<T>() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(
    async ({ method, url, errorType }: GetProducts) => {
      setIsLoading(true);
      try {
        const data: T = await request({
          method,
          url,
        });
        return data;
      } catch {
        showToast(errorType);
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );

  return { getData, isLoading };
}
