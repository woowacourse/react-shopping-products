import { useCallback } from "react";
import { CartItemsAPI } from "../apis/cartItems";
import { Products } from "../apis/types/products";

interface UseCartHandlersProps {
  products: Products | null;
  cartItemInfo: Array<{
    cartId: number;
    productId: number;
    quantity: number;
  }>;
  onError: (message: string) => void;
  onRefresh: () => Promise<void>;
}

const useCartHandlers = ({
  products,
  cartItemInfo,
  onError,
  onRefresh,
}: UseCartHandlersProps) => {
  const getProductStock = useCallback(
    (productId: number): number => {
      const product = products?.content.find((p) => p.id === productId);
      return product?.quantity ?? 0;
    },
    [products]
  );

  const handleAddToCart = useCallback(
    async (productId: number) => {
      const stockQuantity = getProductStock(productId);

      if (stockQuantity <= 0) {
        onError("품절된 상품입니다.");
        return;
      }

      try {
        await CartItemsAPI.post(productId);
        await onRefresh();
      } catch (error) {
        onError(
          error instanceof Error
            ? error.message
            : "장바구니 추가에 실패했습니다."
        );
      }
    },
    [getProductStock, onError, onRefresh]
  );

  const handleQuantityIncrease = useCallback(
    async (productId: number) => {
      const currentItem = cartItemInfo.find(
        (item) => item.productId === productId
      );
      const stockQuantity = getProductStock(productId);

      if (currentItem) {
        if (currentItem.quantity >= stockQuantity) {
          onError("재고 수량을 초과할 수 없습니다.");
          await onRefresh();
          return;
        }

        try {
          await CartItemsAPI.updateQuantity(
            currentItem.cartId,
            currentItem.quantity + 1
          );
          await onRefresh();
        } catch (error) {
          onError(
            error instanceof Error ? error.message : "수량 증가에 실패했습니다."
          );
        }
      }
    },
    [cartItemInfo, getProductStock, onError, onRefresh]
  );

  const handleQuantityDecrease = useCallback(
    async (productId: number) => {
      const currentItem = cartItemInfo.find(
        (item) => item.productId === productId
      );

      if (currentItem) {
        try {
          if (currentItem.quantity === 1) {
            await CartItemsAPI.delete(currentItem.cartId);
          } else {
            await CartItemsAPI.updateQuantity(
              currentItem.cartId,
              currentItem.quantity - 1
            );
          }
          await onRefresh();
        } catch (error) {
          onError(
            error instanceof Error ? error.message : "수량 감소에 실패했습니다."
          );
        }
      }
    },
    [cartItemInfo, onError, onRefresh]
  );

  const handleRemoveFromCart = useCallback(
    async (productId: number) => {
      const currentItem = cartItemInfo.find(
        (item) => item.productId === productId
      );

      if (currentItem) {
        try {
          await CartItemsAPI.delete(currentItem.cartId);
          await onRefresh();
        } catch (error) {
          onError(
            error instanceof Error ? error.message : "상품 삭제에 실패했습니다."
          );
        }
      }
    },
    [cartItemInfo, onError, onRefresh]
  );

  return {
    handleAddToCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleRemoveFromCart,
  };
};

export default useCartHandlers;
