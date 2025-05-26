import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../../types/response.types";
import { CartItem } from "../../hooks/useFetchCartProducts/index.types";
import fetchProducts from "../../api/fetchProducts";
import { fetchCartItems } from "../../api/cart";

interface DataContextType {
  data: {
    products: Product[];
    cart: CartItem[];
  };
  fetchData: (
    key: keyof DataContextType["data"],
    fetchFn: () => Promise<unknown>
  ) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<DataContextType["data"]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<{ products: Product[]; cart: CartItem[] }>({
    products: [],
    cart: [],
  });

  async function fetchData<T>(
    key: keyof DataContextType["data"],
    fetchFn: () => Promise<T>
  ) {
    const result = await fetchFn();
    setData((prev) => ({
      ...prev,
      [key]: result,
    }));
  }

  useEffect(() => {
    fetchData<Product[]>("products", () =>
      fetchProducts({ category: "전체", sort: "낮은 가격순" })
    );
    fetchData<CartItem[]>("cart", fetchCartItems);
  }, []);

  return (
    <DataContext.Provider value={{ data, fetchData, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
