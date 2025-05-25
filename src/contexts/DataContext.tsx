import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";

export const APIContext = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}>({
  data: {},
  setData: () => {},
});

export function APIProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});

  return (
    <APIContext.Provider value={{ data, setData }}>
      {children}
    </APIContext.Provider>
  );
}

export function useAPIData<T>(name: string) {
  const { data } = useContext(APIContext);
  return data[name] as T | undefined;
}

export function useAPI<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<T>;
  name: string;
}) {
  const { data, setData } = useContext(APIContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     withLoading(async () => {
  //       const { data, error } = await getProducts();
  //       setErrorMessage(error?.message || "");
  //       if (!error?.message) {
  //         setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
  //       }
  //     });
  //   };

  //   fetchData();
  // }, []);

  // const request = useCallback(() => {
  //   fetcher().then((res) => {
  //     setData((data) => {
  //       return { ...data, [name]: res };
  //     });
  //   });
  // }, [fetcher, name, setData]);
  const request = useCallback(async () => {
    try {
      const res = await fetcher();
      setData((data) => {
        return { ...data, [name]: res };
      });
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error?.message || "에러가 발생했습니다.");
      console.log("hi");
    }
  }, [fetcher, name, setData]);

  useEffect(() => {
    const hasData = data[name];
    if (hasData) {
      return;
    }
    request();
  }, [data, name, request]);

  return { data: data[name] as T | undefined, refetch: request };
}
