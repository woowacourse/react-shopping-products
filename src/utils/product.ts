import { CartItem, ProductItem } from "@/types";
import { InfiniteData } from "@tanstack/react-query";

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
        if (
          cartItemsData
            ?.map((cartItem) => cartItem.product.id)
            .includes(product.id)
        ) {
          const quantity = cartItemsData.filter(
            (cartItem) => cartItem.product.id === product.id
          )[0].quantity;
          return { ...product, quantity };
        }
        return product;
      }) || []
  );
};
