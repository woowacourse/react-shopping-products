import { useCallback, useMemo } from "react";
import { CartItemsAPI } from "../apis/CartItemsAPI";
import { useAPI } from "../../../apis/contexts/useAPI";
import useApiResponseToasts from "../../../apis/contexts/useApiResponseToasts";
import { CartItem } from "../../../apis/types/response";

interface UseCartItemsResult {
  cartItems: CartItem[] | null;
  cartItemsCount: number;
  error: string | null;
  loading: boolean;
  totalPriceInCart: number;

  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
  deleteProductInCart: (cartId: number) => Promise<void>;

  refetchCartItems: () => void;
}

export const useCartItems = (): UseCartItemsResult => {
  const { handleError, handleSuccess } = useApiResponseToasts();

  const fetcher = useCallback(() => CartItemsAPI.get(), []);

  const {
    data: cartItems,
    error,
    loading,
    refetch,
  } = useAPI("cartItems", fetcher);

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
        const response = await CartItemsAPI.delete(currentProductId.cartId);
        if (handleError(response)) return;
        handleSuccess(response, "상품이 장바구니에서 삭제되었습니다.");
      } else {
        const response = await CartItemsAPI.patch(
          currentProductId.cartId,
          quantity - 1
        );
        if (handleError(response)) return;
      }

      refetch();
    },
    [cartItemIds, quantityByProductId, refetch, handleError, handleSuccess]
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

      if (handleError(response)) return;

      refetch();
    },
    [cartItemIds, quantityByProductId, refetch, handleError]
  );

  const addProductInCart = useCallback(
    async (productId: number) => {
      const response = await CartItemsAPI.post(productId);

      if (handleError(response)) return;
      handleSuccess(response, "상품이 장바구니에 추가되었습니다.");

      refetch();
    },
    [refetch, handleError, handleSuccess]
  );

  const deleteProductInCart = useCallback(
    async (cartId: number) => {
      const response = await CartItemsAPI.delete(cartId);

      if (handleError(response)) return;
      handleSuccess(response, "상품이 장바구니에서 삭제되었습니다.");

      refetch();
    },
    [refetch, handleError, handleSuccess]
  );

  return {
    cartItems,
    cartItemsCount,
    loading,
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
