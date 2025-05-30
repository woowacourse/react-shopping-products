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

export interface CartProductContextType {
  cartItemIds: Record<"productId" | "cartId" | "quantity", number>[];
  products: ProductPageResponse | null;
  fetchCartProducts: () => void;
  fetchProducts: (category: categoryType, sort: sortType) => void;
  setCartItemIds: Dispatch<
    SetStateAction<Record<"productId" | "cartId" | "quantity", number>[]>
  >;
}

const CartProductContext = createContext<CartProductContextType | null>(null);

export function CartProductProvider({
  children,
  setErrorTrue,
}: {
  children: React.ReactNode;
  setErrorTrue: (type: ERROR_TYPE) => void;
}) {
  const { data: cartItemsResponse, fetchData: fetchCartData } = useResource<{
    content: CartItem[];
  }>(setErrorTrue, "CART");

  const { data: products, fetchData: fetchProductData } =
    useResource<ProductPageResponse>(setErrorTrue, "PRODUCTS");

  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId" | "quantity", number>[]
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
        cartItemsResponse.content.map((item) => {
          return {
            productId: item.product.id,
            cartId: item.id,
            quantity: item.quantity,
          };
        })
      );
    }
  }, [cartItemsResponse]);

  return (
    <CartProductContext.Provider
      value={{
        cartItemIds,
        setCartItemIds,
        products,
        fetchCartProducts,
        fetchProducts,
      }}
    >
      {children}
    </CartProductContext.Provider>
  );
}

export function useCartProduct() {
  const context = useContext(CartProductContext);
  if (!context) throw new Error("CartProductProvider로 감싸야 합니다.");
  return context;
}
