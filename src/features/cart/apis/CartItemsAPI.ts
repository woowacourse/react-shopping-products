import { httpClient } from "../../../apis/httpClient";
import { CartItem } from "../../../apis/types/response";

const ERROR_MESSAGE = {
  GET: "장바구니를 가져오는 데 실패했습니다.",
  POST: "상품을 장바구니에 추가하는 데 실패했습니다.",
  DELETE: "장바구니에서 상품을 삭제하는 데 실패했습니다.",
  PATCH: "장바구니 상품 수량을 변경하는 데 실패했습니다.",
};

export const CartItemsAPI = {
  get: async (): Promise<CartItem[]> => {
    const params = new URLSearchParams({
      page: "0",
      size: "50",
      sort: "asc",
    });

    const response = await httpClient.get(`cart-items?${params.toString()}`);
    if (!response.ok) throw new Error(ERROR_MESSAGE.GET);

    return await response.json();
  },

  post: async (productId: number) => {
    const response = await httpClient.post(`cart-items`, {
      productId,
      quantity: 1,
    });

    if (!response.ok) throw new Error(ERROR_MESSAGE.POST);
  },

  delete: async (cartId: number) => {
    const response = await httpClient.delete(`cart-items/${cartId}`);

    if (!response.ok) throw new Error(ERROR_MESSAGE.DELETE);
  },

  patch: async (cartId: number, quantity: number) => {
    const response = await httpClient.patch(`cart-items/${cartId}`, {
      id: cartId,
      quantity,
    });

    if (!response.ok) throw new Error(ERROR_MESSAGE.PATCH);
  },
};
