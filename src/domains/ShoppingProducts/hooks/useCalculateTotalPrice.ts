import { useMemo } from "react";
import { CartItemType } from "../apis/types/cartItem";
import { ProductType } from "../apis/types/product";

interface useCalculateTotalPriceProps {
  cartItem: CartItemType[];
  productItem: ProductType[];
}

export function useCalculateTotalPrice({
  cartItem,
  productItem,
}: useCalculateTotalPriceProps) {
  return useMemo(() => {
    return cartItem.reduce((total, cartItem) => {
      const selectedProduct = productItem.find(
        (product) => product.id === cartItem.product.id
      );
      if (selectedProduct) {
        return total + selectedProduct.price * cartItem.quantity;
      }
      return total;
    }, 0);
  }, [cartItem, productItem]);
}
