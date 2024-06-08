import { InfiniteData } from "@tanstack/react-query";
import { CartItem, ProductItem } from "@/types";

export const changeToProductList = (
  productsData?: InfiniteData<{ content: ProductItem[] }>,
  cartItemsData?: CartItem[]
) => {
  return (
    productsData?.pages
      .flatMap((page) => {
        return page.content;
      })
      .map((product) => {
        if (cartItemsData?.map((cartItem) => cartItem.product.id).includes(product.id)) {
          const { quantity, id } = cartItemsData.filter(
            (cartItem) => cartItem.product.id === product.id
          )[0];

          return { ...product, quantity, cartItemId: id };
        }
        return product;
      }) || []
  );
};

export const calculatePaymentPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((prev, curr) => {
    return prev + curr.quantity * curr.product.price;
  }, 0);
};
