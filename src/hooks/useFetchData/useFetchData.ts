import { useCallback } from "react";
import { fetchCartItems } from "../../api/cart";
import fetchProducts, { FetchProductsProps } from "../../api/products";
import { useToast } from "../../provider/ToastProvider";
import { CartItemType, Product } from "../../types/response.types";

function useFetchData() {
  const { showToast } = useToast();

  const getCartItems = useCallback(async () => {
    let cartItems: CartItemType[] = [];
    try {
      cartItems = await fetchCartItems();
    } catch {
      showToast("장바구니 정보를 로딩하는 중 에러가 발생했습니다.");
    }

    return cartItems;
  }, [showToast]);

  const getProducts = useCallback(
    async ({ category, sort }: FetchProductsProps) => {
      let products: Product[] = [];
      try {
        products = await fetchProducts({ category, sort });
      } catch {
        showToast("상품 정보를 로딩하는 중 에러가 발생했습니다.");
      }

      return products;
    },
    [showToast]
  );

  return { getCartItems, getProducts };
}

export default useFetchData;
