import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import fetcher from "@/apis/fetcher";

export const getCartItems = async () => {
  const response = await fetcher.get({
    url: SERVER_URL.apiUrl + END_POINT.cartItems,
  });
  const data = await response.json();

  return data.content;
};

export interface PostCartItemParams {
  productId: number;
  quantity: number;
}

export const postCartItem = async ({ productId, quantity }: PostCartItemParams) => {
  const response = await fetcher.post({
    url: SERVER_URL.apiUrl + END_POINT.cartItems,
    body: { productId, quantity },
  });
  return response;
};

export interface PatchCartItemParams {
  cartId: number;
  quantity: number;
}

export const patchCartItem = async ({ cartId, quantity }: PatchCartItemParams) => {
  return await fetcher.patch({
    url: `${SERVER_URL.apiUrl + END_POINT.cartItems}/${cartId}`,
    body: { quantity },
  });
};

export interface DeleteCartItemParams {
  cartId: number;
}

export const deleteCartItem = async ({ cartId }: DeleteCartItemParams) => {
  const response = await fetcher.delete({
    url: `${SERVER_URL.apiUrl + END_POINT.cartItems}/${cartId}`,
  });
  return response;
};
