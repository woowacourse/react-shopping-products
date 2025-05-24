import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useShowError} from '../../../shared/provider/errorProvider';

type ApiContextType = {
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

const ApiContext = createContext<ApiContextType>({
  data: {},
  setData: () => {},
});

export const ApiProvider = ({children}: {children: ReactNode}) => {
  const [data, setData] = useState<Record<string, unknown>>({});
  return (
    <ApiContext.Provider value={{data, setData}}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = <T,>(fetchFn: () => Promise<T>, name: string) => {
  const {data, setData} = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const showError = useShowError();

  const requestApi = useCallback(async () => {
    try {
      const result = await fetchFn();
      setData((prev) => ({...prev, [name]: result}));
    } catch (err) {
      showError?.('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, name, setData, showError]);

  useEffect(() => {
    if (data[name] === undefined) {
      setIsLoading(true);
      requestApi();
    }
  }, [name, data, requestApi]);

  return {
    data: data[name] as T,
    isLoading,
    refetch: requestApi,
  };
};
