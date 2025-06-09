import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem } from "../../../apis/types/response";
import useFetch from "../../../shared/hooks/useFetch";
import { CartItemsAPI } from "../apis/CartItemsAPI";
import useToast from "../../../shared/hooks/useToast";
import { TOAST_TYPES } from "../../../shared/config/toast";

export interface CartContextType {
  cartItems: CartItem[];
  refetch: () => Promise<void>;
  loading: boolean;
  error: boolean;

  cartItemsCount: number;
  totalPriceInCart: number;

  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
  deleteProductInCart: (cartId: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data, loading, error, success, fetchData } = useFetch<CartItem[]>(
    () => CartItemsAPI.get()
  );

  const { showToast } = useToast();

  useEffect(() => {
    if (data && success) {
      setCartItems(data);
    }
  }, [data, success]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  const cartItemIds = useMemo(
    () =>
      cartItems?.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems]
  );

  const cartItemsCount = cartItems?.length ?? 0;

  const allQuantities = useMemo(
    () =>
      cartItems?.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
        quantity: productInfo.quantity,
      })) ?? [],
    [cartItems]
  );

  const quantityByProductId = useCallback(
    (productId: number) =>
      allQuantities.find((item) => item.productId === productId)?.quantity ?? 0,
    [allQuantities]
  );

  const totalPriceInCart = useMemo(
    () =>
      cartItems?.reduce((total, productInfo) => {
        const price = productInfo.product?.price ?? 0;
        const quantity = productInfo.quantity ?? 0;
        return total + price * quantity;
      }, 0) ?? 0,
    [cartItems]
  );

  const decreaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentProductId = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentProductId) return;

      const quantity = quantityByProductId(currentProductId.productId);

      if (quantity <= 1) {
        try {
          await CartItemsAPI.delete(currentProductId.cartId);

          showToast({
            message: "상품이 장바구니에서 삭제되었습니다.",
            type: TOAST_TYPES.SUCCESS,
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "알 수 없는 오류가 발생했습니다.";

          showToast({ message, type: TOAST_TYPES.ERROR });
        }
      } else {
        try {
          await CartItemsAPI.patch(currentProductId.cartId, quantity - 1);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "알 수 없는 오류가 발생했습니다.";

          showToast({ message, type: TOAST_TYPES.ERROR });
        }
      }

      fetchData();
    },
    [cartItemIds, quantityByProductId, fetchData, showToast]
  );

  const increaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentProductId = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentProductId) return;

      try {
        await CartItemsAPI.patch(
          currentProductId.cartId,
          quantityByProductId(currentProductId.productId) + 1
        );
        fetchData();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";

        showToast({ message, type: TOAST_TYPES.ERROR });
      }
    },
    [fetchData, cartItemIds, quantityByProductId, showToast]
  );

  const addProductInCart = useCallback(
    async (productId: number) => {
      try {
        await CartItemsAPI.post(productId);
        fetchData();

        showToast({
          message: "상품이 장바구니에 추가되었습니다.",
          type: TOAST_TYPES.SUCCESS,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        showToast({ message, type: TOAST_TYPES.ERROR });
      }
    },
    [fetchData, showToast]
  );

  const deleteProductInCart = useCallback(
    async (cartId: number) => {
      try {
        await CartItemsAPI.delete(cartId);
        fetchData();

        showToast({
          message: "상품이 장바구니에서 삭제되었습니다.",
          type: TOAST_TYPES.SUCCESS,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        showToast({ message, type: TOAST_TYPES.ERROR });
      }
    },
    [fetchData, showToast]
  );

  const contextValue = useMemo(
    () => ({
      cartItems: cartItems || [],
      refetch,
      loading,
      error,

      cartItemsCount,
      totalPriceInCart,

      quantityByProductId,
      decreaseItemQuantity,
      increaseItemQuantity,
      addProductInCart,
      deleteProductInCart,
    }),
    [
      cartItems,
      refetch,
      loading,
      error,

      cartItemsCount,
      totalPriceInCart,

      quantityByProductId,
      decreaseItemQuantity,
      increaseItemQuantity,
      addProductInCart,
      deleteProductInCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
