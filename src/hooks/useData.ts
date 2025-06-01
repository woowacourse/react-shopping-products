import { useContext, useCallback, useEffect } from "react";
import { ApiContext } from "../context/ApiContext/ApiContext";

const useData = <T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<T>;
  name: string;
}) => {
  const { data, setData, loadingStates, updateLoadingState, isInProvider } =
    useContext(ApiContext);

  if (!isInProvider) {
    throw new Error("useData must be used within an ApiProvider");
  }

  const request = useCallback(async () => {
    updateLoadingState(name, true);
    try {
      const result = await fetcher();
      setData((prevData) => ({ ...prevData, [name]: result }));
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
    } finally {
      updateLoadingState(name, false);
    }
  }, [fetcher, name, setData, updateLoadingState]);

  useEffect(() => {
    const hasData = data[name];
    if (hasData) {
      return;
    }

    request();
  }, [data, name, request]);

  return {
    data: (data[name] ?? []) as T,
    refetch: request,
    loading: loadingStates[name] ?? true,
  };
};

export default useData;
