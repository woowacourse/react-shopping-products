import { useCallback, useMemo } from "react";
import { isApiError } from "../../shared/api/apiClient";
import { TOAST_TYPES } from "../../shared/config/toast";
import { useAPI } from "../../shared/hooks/useAPI";
import useToast from "../../shared/hooks/useToast";
import { CartItemsAPI } from "./api";
import { CartItems } from "./response";

interface UseCartItemsResult {
  cartItems: CartItems | null;
  cartItemsCount: number;
  error: string | null;
  isLoading: boolean;
  totalPriceInCart: number;

  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
  deleteProductInCart: (cartId: number) => Promise<void>;

  refetchCartItems: () => void;
}

export const useCartItems = (): UseCartItemsResult => {
  const { showToast } = useToast();

  const fetcher = useCallback(() => CartItemsAPI.get(), []);

  const {
    data: cartItems,
    error,
    isLoading,
    refetch,
  } = useAPI("cartItems", fetcher);

  const cartItemIds = useMemo(
    () =>
      cartItems?.content.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems?.content]
  );

  const cartItemsCount = cartItems?.content.length ?? 0;

  const allQuantities = useMemo(
    () =>
      cartItems?.content.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
        quantity: productInfo.quantity,
      })) ?? [],
    [cartItems?.content]
  );

  const quantityByProductId = useCallback(
    (productId: number) =>
      allQuantities.find((item) => item.productId === productId)?.quantity ?? 0,
    [allQuantities]
  );

  const totalPriceInCart = useMemo(
    () =>
      cartItems?.content.reduce((total, productInfo) => {
        const price = productInfo.product?.price ?? 0;
        const quantity = productInfo.quantity ?? 0;
        return total + price * quantity;
      }, 0) ?? 0,
    [cartItems?.content]
  );

  const decreaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentProductId = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentProductId) return;

      const quantity = quantityByProductId(currentProductId.productId);

      let response;
      if (quantity <= 1) {
        response = await CartItemsAPI.delete(currentProductId.cartId);
      } else {
        response = await CartItemsAPI.patch(
          currentProductId.cartId,
          quantity - 1
        );
      }

      if (isApiError(response)) {
        showToast({
          message: response.error,
          type: TOAST_TYPES.ERROR,
        });
        return;
      }

      refetch();
    },
    [cartItemIds, quantityByProductId, refetch, showToast]
  );

  const increaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentProductId = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentProductId) return;

      const response = await CartItemsAPI.patch(
        currentProductId.cartId,
        quantityByProductId(currentProductId.productId) + 1
      );

      if (isApiError(response)) {
        showToast({
          message: response.error,
          type: TOAST_TYPES.ERROR,
        });
        return;
      }

      refetch();
    },
    [cartItemIds, quantityByProductId, refetch, showToast]
  );

  const addProductInCart = useCallback(
    async (productId: number) => {
      const response = await CartItemsAPI.post(productId);

      if (isApiError(response)) {
        showToast({
          message: response.error,
          type: TOAST_TYPES.ERROR,
        });
        return;
      }

      showToast({
        message: "상품이 장바구니에 추가되었습니다.",
        type: TOAST_TYPES.SUCCESS,
      });

      refetch();
    },
    [refetch, showToast]
  );

  const deleteProductInCart = useCallback(
    async (cartId: number) => {
      const response = await CartItemsAPI.delete(cartId);

      if (isApiError(response)) {
        showToast({
          message: response.error,
          type: TOAST_TYPES.ERROR,
        });
        return;
      }

      refetch();
    },
    [refetch, showToast]
  );

  return {
    cartItems,
    cartItemsCount,
    isLoading,
    error,
    totalPriceInCart,

    quantityByProductId,
    decreaseItemQuantity,
    increaseItemQuantity,
    addProductInCart,
    deleteProductInCart,

    refetchCartItems: refetch,
  };
};
