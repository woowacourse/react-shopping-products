import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ToastContext } from '../context/ToastProvider';
import { Product } from '@/features/ProductList/types/Product';
import { CartItem } from '@/features/ProductList/types/Cart';

type APIData = {
  product: Product[];
  cartItem: CartItem[];
  [key: string]: unknown;
};

export const APIContext = createContext<{
  data: Partial<APIData>; //나중에 사용할 때 as T로 바꿔주면 됨
  setData: React.Dispatch<React.SetStateAction<Partial<APIData>>>;
}>({
  data: {},
  setData: () => {},
});

export function APIProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<Partial<APIData>>({});

  return <APIContext.Provider value={{ data, setData }}>{children}</APIContext.Provider>;
}

export function useAPI<T>({ fetcher, name }: { fetcher: () => Promise<T>; name: string }) {
  const { data, setData } = useContext(APIContext);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, Error | null>>({});
  const { showToast } = useContext(ToastContext);

  const request = useCallback(async () => {
    if (!data[name]) {
      setLoadingMap((prev) => ({ ...prev, [name]: true }));
    }
    setErrorMap((prev) => ({ ...prev, [name]: null }));

    try {
      const res = await fetcher();
      setData((prev) => ({ ...prev, [name]: res }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setErrorMap((prev) => ({ ...prev, [name]: error }));
      showToast(error.message);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [name]: false }));
    }
  }, [fetcher, name, setData, showToast]);

  useEffect(() => {
    if (data[name]) return;
    request();
  }, [name]);

  return {
    data: data[name] as T | undefined,
    refetch: request,
    isLoading: loadingMap[name] ?? false,
    error: errorMap[name] ?? null,
  };
}
