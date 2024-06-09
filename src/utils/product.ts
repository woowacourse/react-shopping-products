import { InfiniteData } from "@tanstack/react-query";
import { CartItem, ProductItem } from "@/types";

export const changeToProductList = (
  productsData?: InfiniteData<{ content: ProductItem[] }>,
  cartItemsData?: CartItem[]
) => {
  const cartItemsMap = new Map(cartItemsData?.map((cartItem) => [cartItem.product.id, cartItem]));

  return (
    productsData?.pages
      .flatMap((page) => page.content)
      .map((product) => {
        const cartItem = cartItemsMap.get(product.id);
        return cartItem
          ? { ...product, quantity: cartItem.quantity, cartItemId: cartItem.id }
          : product;
      }) || []
  );
};

export const calculatePaymentPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((prev, curr) => {
    return prev + curr.quantity * curr.product.price;
  }, 0);
};
