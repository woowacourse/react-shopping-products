import { DataContext } from "@/context/DataContext";
import { useContext, useEffect } from "react";

interface UseDataProps<T> {
  fetchFn: () => Promise<T>;
  name: string;
}

const useData = <T>({ fetchFn, name }: UseDataProps<T>) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData는 DataProvider 내부에서 사용되어야 합니다.");
  }

  const { data, setData, isLoading, setIsLoading } = context;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((prevData) => ({
        ...prevData,
        [name]: true,
      }));
      try {
        const response = await fetchFn();
        setData((prevData) => ({
          ...prevData,
          [name]: response,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading((prevData) => ({
          ...prevData,
          [name]: false,
        }));
      }
    };

    fetchData();
  }, [name, fetchFn, setData, setIsLoading]);

  return { data: data[name] as T, isLoading: isLoading[name] ?? false };
};

export default useData;
