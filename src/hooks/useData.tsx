import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { CartItem, ProductPageResponse } from "../types/response.types";
import { ERROR_TYPE } from "./useError";
import { useResource } from "./useResource";
import { categoryType, sortType } from "../types/index.types";
import { getQueryString } from "../utils/getQueryString";

interface DataContextType {
  cartItemIds: Record<"productId" | "cartId", number>[];
  products: ProductPageResponse | null;
  fetchCartProducts: () => void;
  fetchProducts: (category: categoryType, sort: sortType) => void;
  setCartItemIds: Dispatch<
    SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
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
  const {
    data: cartItemsResponse,
    fetchData: fetchCartData,
    isLoading: isCartLoading,
  } = useResource<{ content: CartItem[] }>(setErrorTrue, "CART");

  const {
    data: products,
    fetchData: fetchProductData,
    isLoading: isProductsLoading,
  } = useResource<ProductPageResponse>(setErrorTrue, "PRODUCTS");

  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId", number>[]
  >([]);

  const fetchCartProducts = useCallback(() => {
    fetchCartData("/cart-items");
  }, [fetchCartData]);

  const fetchProducts = useCallback(
    (category: categoryType, sort: sortType) => {
      const query = getQueryString(category, sort);
      fetchProductData(`/products?${query}`);
    },
    [fetchProductData]
  );

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  useEffect(() => {
    if (cartItemsResponse) {
      setCartItemIds(
        cartItemsResponse.content.map((item) => ({
          productId: item.product.id,
          cartId: item.id,
        }))
      );
    }
  }, [cartItemsResponse]);

  return (
    <DataContext.Provider
      value={{
        cartItemIds,
        setCartItemIds,
        products,
        fetchCartProducts,
        fetchProducts,
        isLoading: isCartLoading || isProductsLoading,
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
