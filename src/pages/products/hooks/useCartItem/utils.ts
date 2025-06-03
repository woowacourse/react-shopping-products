import { QueryClientContextType } from "@/modules/Query/QueryProvider";
import { GetCartItemsResponse } from "@/types";

export function optimisticIncreaseCartItem(queryClient: QueryClientContextType, productId: number) {
  const prevCartItems = queryClient.getQueryData("cartItems") as GetCartItemsResponse;
  const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);
  const newCartContent = [...prevCartItems.content];
  newCartContent[currentCartItemIndex] = {
    ...newCartContent[currentCartItemIndex],
    quantity: newCartContent[currentCartItemIndex].quantity + 1,
  };
  queryClient.setQueryData("cartItems", { ...prevCartItems, content: newCartContent });
}

export function optimisticDecreaseCartItem(queryClient: QueryClientContextType, productId: number) {
  const prevCartItems = queryClient.getQueryData("cartItems") as GetCartItemsResponse;
  const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);
  const newCartContent = [...prevCartItems.content];
  newCartContent[currentCartItemIndex] = {
    ...newCartContent[currentCartItemIndex],
    quantity: newCartContent[currentCartItemIndex].quantity - 1,
  };
  queryClient.setQueryData("cartItems", { ...prevCartItems, content: newCartContent });
}

export function optimisticDeleteCartItem(queryClient: QueryClientContextType, cartItemId: number) {
  const prevCartItems = queryClient.getQueryData("cartItems") as GetCartItemsResponse;
  const newCartContent = prevCartItems.content.filter((item) => item.id !== cartItemId);
  queryClient.setQueryData("cartItems", { ...prevCartItems, content: newCartContent });
}
