// hooks/useData.ts
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ProductPageResponse, CartItem } from "../types/response.types";
import { ERROR_TYPE } from "./useError";
import request from "../utils/request";
import { categoryType, sortType } from "../types/index.types";

interface DataContextType {
  cartItemIds: Record<"productId" | "cartId", number>[];
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  products: ProductPageResponse | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductPageResponse | null>>;
  fetchCartProducts: () => Promise<void>;
  fetchProducts: (category: categoryType, sort: sortType) => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({
  children,
  setErrorTrue,
}: {
  children: React.ReactNode;
  setErrorTrue: (type: ERROR_TYPE) => void;
}) {
  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId", number>[]
  >([]);
  const [products, setProducts] = useState<ProductPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartProducts = useCallback(async () => {
    try {
      const data = await request({
        method: "GET",
        url: "/cart-items",
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
      });

      setCartItemIds(
        data.content.map((item: CartItem) => ({
          productId: item.product.id,
          cartId: item.id,
        }))
      );
    } catch {
      setErrorTrue("CART");
    }
  }, [setErrorTrue]);

  const fetchProducts = useCallback(
    async (category: categoryType, sort: sortType) => {
      try {
        setIsLoading(true);

        const baseQuery = {
          page: "0",
          size: "20",
          sort: sort === "낮은 가격순" ? "price,asc" : "price,desc",
        };

        const queryObj =
          category === "전체" ? baseQuery : { category, ...baseQuery };

        const queryString = new URLSearchParams(queryObj).toString();

        const data: ProductPageResponse = await request({
          method: "GET",
          url: `/products?${queryString}`,
        });

        setProducts(data);
      } catch {
        setErrorTrue("PRODUCTS");
      } finally {
        setIsLoading(false);
      }
    },
    [setErrorTrue]
  );

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return (
    <DataContext.Provider
      value={{
        cartItemIds,
        setCartItemIds,
        products,
        setProducts,
        fetchCartProducts,
        fetchProducts,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("DataProvider로 감싸야 합니다.");
  return context;
}
