import { useCallback } from "react";
import { CartItemsAPI } from "../apis/cartItems";
import { CartItems } from "../apis/types/cartItems";
import { Products } from "../apis/types/products";
import { useData } from "./useData";

interface UseCartItemsProps {
  products: Products | null;
}

const useCartItems = ({ products }: UseCartItemsProps) => {
  const fetcher = useCallback(() => {
    return CartItemsAPI.get();
  }, []);

  const {
    data: cartItems,
    error: errorMessage,
    setError: setErrorMessage,
    refetch: refreshCartItems,
  } = useData<CartItems>({
    key: "cartItems",
    fetcher,
  });

  const cartItemInfo =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    })) ?? [];

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
        setErrorMessage("품절된 상품입니다.");
        return;
      }

      try {
        await CartItemsAPI.post(productId);
        await refreshCartItems();
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "장바구니 추가에 실패했습니다."
        );
      }
    },
    [getProductStock, setErrorMessage, refreshCartItems]
  );

  const handleQuantityIncrease = useCallback(
    async (productId: number) => {
      const currentItem = cartItemInfo.find(
        (item) => item.productId === productId
      );
      const stockQuantity = getProductStock(productId);

      if (currentItem) {
        if (currentItem.quantity >= stockQuantity) {
          setErrorMessage("재고 수량을 초과할 수 없습니다.");
          await refreshCartItems();
          return;
        }

        try {
          await CartItemsAPI.updateQuantity(
            currentItem.cartId,
            currentItem.quantity + 1
          );
          await refreshCartItems();
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : "수량 증가에 실패했습니다."
          );
        }
      }
    },
    [cartItemInfo, getProductStock, setErrorMessage, refreshCartItems]
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
          await refreshCartItems();
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : "수량 감소에 실패했습니다."
          );
        }
      }
    },
    [cartItemInfo, setErrorMessage, refreshCartItems]
  );

  const handleRemoveFromCart = useCallback(
    async (productId: number) => {
      const currentItem = cartItemInfo.find(
        (item) => item.productId === productId
      );

      if (currentItem) {
        try {
          await CartItemsAPI.delete(currentItem.cartId);
          await refreshCartItems();
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : "상품 삭제에 실패했습니다."
          );
        }
      }
    },
    [cartItemInfo, setErrorMessage, refreshCartItems]
  );

  return {
    cartItemInfo,
    errorMessage,
    setErrorMessage,
    handleAddToCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleRemoveFromCart,
  };
};

export default useCartItems;
