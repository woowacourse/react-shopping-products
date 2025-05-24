import { createContext, useCallback, useContext, useEffect } from 'react';

type DataContextValue = {
  data: Record<string, any>;
  setData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export const DataContext = createContext<DataContextValue | null>(null);

type useDataContextProps = {
  fetcher: (args?: any) => Promise<any>;
  key: string;
  fetcherParams?: Record<string, any>;
};

/*
data = {
 products :{
  products: [],
  isLoading: false,
  error: {
    isError: false,
    status: null,
  },
 },
  cartItems: {
    cartItems: [],
    isLoading: false,
    error: {
      isError: false,
      status: null,
    },
  },
}
*/

export function useDataContext({
  fetcher,
  key,
  fetcherParams,
}: useDataContextProps) {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('DataProvider 안에 DataContext를 사용해야 합니다.');
  }

  const { data, setData } = context;
  console.log('useDataContext data', data);

  const request = useCallback(async () => {
    try {
      setData((prevData) => ({
        ...prevData,
        [key]: {
          data: [],
          ...prevData[key],
          isLoading: true,
          error: {
            isError: false,
            status: null,
          },
        },
      }));
      const { data: fetchedData, status } = await fetcher(fetcherParams);
      setData((prevData) => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          data: fetchedData.content,
          isLoading: false,
          error: {
            isError: false,
            status: Number(status),
          },
        },
      }));
    } catch (e) {
      if (e instanceof Error) {
        setData((prevData) => ({
          ...prevData,
          [key]: {
            ...prevData[key],
            isLoading: false,
            error: {
              isError: true,
              status: Number(e.message),
            },
          },
        }));
      } else {
        setData((prevData) => ({
          ...prevData,
          [key]: {
            ...prevData[key],
            isLoading: false,
            error: {
              isError: true,
              status: null,
            },
          },
        }));
      }
    } finally {
      setData((prevData) => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          isLoading: false,
        },
      }));
    }
  }, [fetcher, fetcherParams, key, setData]);

  useEffect(() => {
    const hasData = data[key];
    if (hasData) {
      return;
    }

    request();
  }, [fetcher, key, request]);

  const updateError = (key: string, status: number | null) => {
    setData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isLoading: false,
        error: {
          isError: true,
          status,
        },
      },
    }));
  };

  if (!data[key]) {
    return {
      data: [],
      refetch: request,
      isLoading: false,
      error: {
        isError: false,
        status: null,
      },
      updateError,
    };
  }

  return {
    data: data[key].data,
    refetch: request,
    isLoading: data[key]?.isLoading,
    error: data[key]?.error,
    updateError,
  };
}
