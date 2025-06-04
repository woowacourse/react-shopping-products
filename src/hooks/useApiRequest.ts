// hooks/useApiRequest.ts
import { useCallback, useEffect, useState } from 'react';

type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type UseApiRequestProps<TParams, TResult> = {
  method: FetchMethod;
  requestFn: (
    params?: TParams
  ) => Promise<{ data: { content: TResult }; status: number }>;
  enabled?: boolean;
  params?: TParams;
};

function useApiRequest<TParams, TResult>({
  method,
  requestFn,
  enabled,
  params,
}: {
  method: 'GET';
  requestFn: (
    params?: TParams
  ) => Promise<{ data: { content: TResult }; status: number }>;
  enabled?: boolean;
  params?: TParams;
}): {
  data: TResult[] | null;
  isLoading: boolean;
  error: { isError: boolean; status: number | null };
  request: (overrideParams?: TParams) => Promise<void>;
};

function useApiRequest<TParams>({
  method,
  requestFn,
  enabled,
  params,
}: {
  method: 'POST' | 'PATCH' | 'DELETE';
  requestFn: (params: TParams) => Promise<{ data: any; status: number }>;
  params?: TParams;
  enabled?: boolean;
}): {
  isLoading: boolean;
  error: { isError: boolean; status: number | null };
  request: (overrideParams?: TParams) => Promise<void>;
};

function useApiRequest<TParams, TResult>({
  method,
  requestFn,
  enabled = true,
  params,
}: UseApiRequestProps<TParams, TResult>) {
  const [data, setData] = useState<TResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, status: null });

  const request = useCallback(
    async (overrideParams?: TParams) => {
      setIsLoading(true);
      setError({ isError: false, status: null });

      try {
        const res = await requestFn(overrideParams ?? params);
        setData(res.data.content);
      } catch (e: any) {
        setError({
          isError: true,
          status: Number(e?.message) || null,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [params, requestFn]
  );

  useEffect(() => {
    if (method === 'GET' && enabled) {
      request();
    }
  }, [enabled, method, request]);

  return {
    data,
    isLoading,
    error,
    request,
  };
}

export default useApiRequest;
