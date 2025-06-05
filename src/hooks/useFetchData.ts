import { useCallback } from "react";
import { fetchCartItems } from "../api/cart";
import fetchProducts, { FetchProductsProps } from "../api/products";
import { useToast } from "../provider/ToastProvider";
import { CartItemType, Product } from "../types/response.types";
import { ERROR_MESSAGE } from "../constants/errorMessage";

function useFetchData() {
  const { showToast } = useToast();

  const getCartItems = useCallback(async () => {
    let cartItems: CartItemType[] = [];
    try {
      cartItems = await fetchCartItems();
    } catch {
      showToast(ERROR_MESSAGE.CART_LOADING);
    }

    return cartItems;
  }, [showToast]);

  const getProducts = useCallback(
    async ({ category, sort }: FetchProductsProps) => {
      let products: Product[] = [];
      try {
        products = await fetchProducts({ category, sort });
      } catch {
        showToast(ERROR_MESSAGE.PRODUCT_LOADING);
      }

      return products;
    },
    [showToast]
  );

  return { getCartItems, getProducts };
}

export default useFetchData;
