import { useEffect, useState } from "react";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";
import { CartItems } from "../apis/types/cartItems";
import { Products } from "../apis/types/products";

interface UseCartItemsProps {
  products: Products | null;
}

const useCartItems = ({ products }: UseCartItemsProps) => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    refreshCartItems();
  }, []);

  const refreshCartItems = async () => {
    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  const cartItemInfo =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    })) ?? [];

  const getProductStock = (productId: number): number => {
    const product = products?.content.find((p) => p.id === productId);
    return product?.quantity ?? 0;
  };

  const handleAddToCart = async (productId: number) => {
    const stockQuantity = getProductStock(productId);

    if (stockQuantity <= 0) {
      setErrorMessage("품절된 상품입니다.");
      return;
    }

    await CartItemsAPI.post(productId);
    await refreshCartItems();
  };

  const handleQuantityIncrease = async (productId: number) => {
    const currentItem = cartItemInfo.find(
      (item) => item.productId === productId
    );
    const stockQuantity = getProductStock(productId);

    if (currentItem) {
      if (currentItem.quantity >= stockQuantity) {
        setErrorMessage("재고 수량을 초과할 수 없습니다.");
        return;
      }

      await CartItemsAPI.updateQuantity(
        currentItem.cartId,
        currentItem.quantity + 1
      );
      await refreshCartItems();
    }
  };

  const handleQuantityDecrease = async (productId: number) => {
    const currentItem = cartItemInfo.find(
      (item) => item.productId === productId
    );

    if (currentItem) {
      if (currentItem.quantity === 1) {
        await CartItemsAPI.delete(currentItem.cartId);
      } else {
        await CartItemsAPI.updateQuantity(
          currentItem.cartId,
          currentItem.quantity - 1
        );
      }
      await refreshCartItems();
    }
  };

  return {
    cartItems,
    cartItemInfo,
    errorMessage,
    setErrorMessage,
    handleAddToCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
  };
};

export default useCartItems;
